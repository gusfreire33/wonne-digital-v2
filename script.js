document.addEventListener('DOMContentLoaded', function() {

    // Funcionalidade das Tabs de Stats
    const statsTabButtons = document.querySelectorAll('.stats-tab-btn');
    const statsTabContents = document.querySelectorAll('.stats-tab-content');

    statsTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active de todos os botões e conteúdos
            statsTabButtons.forEach(btn => btn.classList.remove('active'));
            statsTabContents.forEach(content => content.classList.remove('active'));

            // Adiciona active no botão clicado
            button.classList.add('active');

            // Mostra o conteúdo correspondente
            const contentToShow = document.getElementById(`stats-${tabName}-content`);
            if (contentToShow) {
                contentToShow.classList.add('active');
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle do item atual
            item.classList.toggle('active');
        });
    });

    // Modal de Contato
    const modal = document.getElementById('contactModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const contactForm = document.getElementById('contactForm');
    const ctaButtons = document.querySelectorAll('.cta-button');

    // Abrir modal ao clicar em qualquer botão CTA
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne scroll do body
        });
    });

    // Fechar modal ao clicar no X
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
    });

    // Fechar modal ao clicar no overlay
    modalOverlay.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Submeter formulário e redirecionar para WhatsApp
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Dados do lead para enviar ao webhook
        const leadData = {
            name: name,
            email: email,
            phone: phone,
            company: 'Landing Page Wonne Digital'
        };

        try {
            // Envia dados para o webhook do Leadbox CRM
            const response = await fetch('https://www.leadbox.online/api/webhooks/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leadData)
            });

            if (!response.ok) {
                console.error('Erro ao enviar dados para o Leadbox:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao conectar com o Leadbox:', error);
            // Continua mesmo se houver erro no webhook
        }

        // Mensagem formatada para WhatsApp
        const message = `Olá! Gostaria de falar com um especialista.%0A%0A` +
                       `*Nome:* ${name}%0A` +
                       `*E-mail:* ${email}%0A` +
                       `*Telefone:* ${phone}`;

        // Número do WhatsApp (formato internacional sem +, espaços ou hífens)
        const whatsappNumber = '5581991738511';

        // Abre WhatsApp em nova aba
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

        // Fecha o modal
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Limpa o formulário
        contactForm.reset();
    });

    // Animação de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada dos elementos ao scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos para animar no scroll
    const animatedElements = document.querySelectorAll(
        '.video-box-container, .stat-card, .case-card, .servico-card, .win-pilar, .close-friends-box, .faq-item, section h2, .fundador-foto, .fundador-info, .comparativo-column'
    );

    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // ===== PANDA VOLUME BUTTON =====
    const ytApiTag = document.createElement('script');
    ytApiTag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(ytApiTag);

    window.onYouTubeIframeAPIReady = function() {
        document.querySelectorAll('.panda-skin').forEach(function(skin, i) {
            const iframe = skin.querySelector('iframe');
            const btn = skin.querySelector('.panda-vol-btn');
            if (!iframe || !btn) return;

            iframe.id = 'panda-iframe-' + i;
            const player = new YT.Player('panda-iframe-' + i, {});
            let muted = false;

            btn.addEventListener('click', function() {
                if (muted) {
                    player.unMute();
                    muted = false;
                    btn.querySelector('.vol-icon-on').style.display = '';
                    btn.querySelector('.vol-icon-off').style.display = 'none';
                } else {
                    player.mute();
                    muted = true;
                    btn.querySelector('.vol-icon-on').style.display = 'none';
                    btn.querySelector('.vol-icon-off').style.display = '';
                }
            });
        });
    };

});

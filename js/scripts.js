document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    $('.nav-link').on('click', function(e) {
        if (!$(this).hasClass('login-btn')) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // DOM Manipulation: Dynamic User Counter
    let userCount = 5000;
    const userStat = document.querySelector('.stat-number');
    setInterval(() => {
        userCount += Math.floor(Math.random() * 10);
        userStat.textContent = `${userCount.toLocaleString()}+`;
    }, 5000);

    // DOM Manipulation: Add Task Feature
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = taskText;
            taskList.appendChild(li);
            taskInput.value = '';
            showNotification('Task added successfully!');
        }
    });

    // jQuery Animation: Feature Card Hover
    $('.feature-card').hover(
        function() {
            $(this).animate({ top: '-10px' }, 300);
        },
        function() {
            $(this).animate({ top: '0' }, 300);
        }
    );

    // jQuery Toggle: Premium Features
    $('#togglePremium').on('click', () => {
        $('#premiumFeatures').fadeToggle(500);
    });

    // AJAX: Load Testimonials
    $.ajax({
        url: 'data/testimonials.json',
        method: 'GET',
        dataType: 'json',
        success: (data) => {
            const carouselInner = $('#testimonialCarousel .carousel-inner');
            carouselInner.empty();
            data.forEach((testimonial, index) => {
                const activeClass = index === 0 ? 'active' : '';
                const stars = '<i class="fas fa-star"></i>'.repeat(Math.floor(testimonial.rating)) +
                              (testimonial.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : '');
                const item = `
                    <div class="carousel-item ${activeClass}">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <p>"${testimonial.content}"</p>
                                <div class="testimonial-rating">${stars}</div>
                                <div class="testimonial-author">
                                    <div class="author-avatar">
                                        <img src="${testimonial.avatar}" alt="${testimonial.author}">
                                    </div>
                                    <div class="author-details">
                                        <h5>${testimonial.author}</h5>
                                        <p>${testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                carouselInner.append(item);
            });
        },
        error: () => showNotification('Failed to load testimonials.')
    });

    // AJAX: Load Updates
    $.ajax({
        url: 'data/updates.json',
        method: 'GET',
        dataType: 'json',
        success: (data) => {
            const updatesList = $('#updatesList');
            updatesList.empty();
            data.forEach(update => {
                const card = `
                    <div class="col-md-6">
                        <div class="updates-card">
                            <h3>${update.title}</h3>
                            <p><small>${update.date}</small></p>
                            <p>${update.description}</p>
                        </div>
                    </div>
                `;
                updatesList.append(card);
            });
        },
        error: () => showNotification('Failed to load updates.')
    });

    // Chat Functionality
    $('#chatToggle').on('click', () => {
        $('#chatBox').slideToggle(300);
    });

    $('.chat-close-btn').on('click', () => {
        $('#chatBox').slideUp(300);
    });

    $('.chat-send-btn').on('click', () => {
        const message = $('#chatInput').val().trim();
        if (message) {
            $('#chat-messages').append(`<div class="chat-message user">${message}</div>`);
            $('#chatInput').val('');
            $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            showNotification('Message sent to support!');
        }
    });

    // Feedback Form Submission
    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();
        if (name && email.includes('@') && message) {
            alert('Thank you for your feedback!');
            this.reset();
            showNotification('Feedback submitted successfully!');
        } else {
            alert('Please fill all fields correctly');
        }
    });
});

function showNotification(message) {
    $('#notification').text(message).fadeIn(500).delay(3000).fadeOut(500);
}
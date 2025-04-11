$(document).ready(() => {
    $.ajax({
        url: './data/updates.json',
        method: 'GET',
        dataType: 'json',
        success: (data) => {
            const updatesList = $('#updatesList');
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
                updatesList.append(card).hide().fadeIn(500);
            });
        },
        error: () => alert('Failed to load updates.')
    });
});
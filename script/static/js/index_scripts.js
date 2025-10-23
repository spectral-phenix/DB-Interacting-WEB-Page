document.addEventListener("DOMContentLoaded", () => {
    const checkAllBtn = document.getElementById("check-all");
    const uncheckAllBtn = document.getElementById("uncheck-all");

    // Fonction pour cocher toutes les cases
    checkAllBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('input[name="columns"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    // Fonction pour décocher toutes les cases
    uncheckAllBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('input[name="columns"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
});

function ajouterCondition() {
    if (conditionCount >= 7) {
        alert("Vous ne pouvez pas ajouter plus de 7 conditions.");
        return;
    }

    conditionCount++;
    const conditionsDiv = document.getElementById("conditions");

    // Contenu HTML pour une nouvelle condition
    const newCondition = `
        <div id="condition_${conditionCount}" class="condition-row">
            <label for="column_${conditionCount}">Colonne :</label>
            <select id="column_${conditionCount}" name="column_${conditionCount}" onchange="mettreAJourPlaceholder(${conditionCount})" required>
                <option value="movie_id">ID du film</option>
                <option value="title">Titre</option>
                <option value="release_year">Année de sortie</option>
                <option value="runtime">Durée</option>
                <option value="genres">Genre</option>
                <option value="revenue">Revenu</option>
                <option value="original_language">Langue originale</option>
            </select>
            <label for="value_${conditionCount}">Valeur :</label>
            <input type="text" id="value_${conditionCount}" name="value_${conditionCount}" placeholder=">2000, Comedy, etc." required>
            <button type="button" class="delete-btn" onclick="supprimerCondition(${conditionCount})">×</button>
        </div>
    `;

    conditionsDiv.insertAdjacentHTML('beforeend', newCondition);

    // Initialiser le placeholder pour la nouvelle condition
    mettreAJourPlaceholder(conditionCount);
}

function supprimerCondition(id) {
    const conditionDiv = document.getElementById(`condition_${id}`);
    if (conditionDiv) {
        conditionDiv.remove();
        conditionCount--;
    }
}

// Fonction pour mettre à jour les placeholders dynamiquement
function mettreAJourPlaceholder(conditionIndex) {
    // Liste des placeholders personnalisés en fonction des colonnes
    const placeholders = {
        'movie_id': '1 ; >= 10',
        'title': 'Pirates of the Caribbean',
        'release_year': '2000 ; >= 2000',
        'runtime': '120 ; >= 150',
        'original_language': 'EN, FR, DE',
        'genres': 'Comedy, Action',
        'revenue': '10 ; >= 5000'
    };

    // Obtenir les éléments de la condition concernée
    const colonneSelect = document.getElementById(`column_${conditionIndex}`);
    const valeurInput = document.getElementById(`value_${conditionIndex}`);

    // Récupérer la colonne sélectionnée
    const colonneSelectionnee = colonneSelect.value;

    // Mettre à jour le placeholder du champ d'entrée avec la valeur correspondante
    if (placeholders[colonneSelectionnee]) {
        valeurInput.placeholder = placeholders[colonneSelectionnee];
    } else {
        valeurInput.placeholder = '>2000, Comedy, etc.';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const tableHeaders = document.querySelectorAll('th.sortable');

    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            let currentOrder = header.dataset.currentOrder;

            // Déterminer le nouvel ordre
            let newOrder = 'asc';
            if (currentOrder === 'asc') {
                newOrder = 'desc';
            } else if (currentOrder === 'desc') {
                newOrder = 'none';
            }

            // Réinitialiser tous les ordres des colonnes
            tableHeaders.forEach(h => h.dataset.currentOrder = 'none');

            // Appliquer l'ordre à la colonne sélectionnée
            if (newOrder === 'none') {
                // Supprimer les champs existants du formulaire pour désactiver le tri
                const columnInput = document.querySelector('input[name="order_by_column"]');
                const directionInput = document.querySelector('input[name="order_by_direction"]');
                if (columnInput) columnInput.remove();
                if (directionInput) directionInput.remove();
            }
            

            // Refaire une requête en ajoutant les paramètres d'ordre
            const form = document.querySelector('form');
            const orderInputColumn = document.createElement('input');
            orderInputColumn.type = 'hidden';
            orderInputColumn.name = 'order_by_column';
            orderInputColumn.value = column;

            const orderInputDirection = document.createElement('input');
            orderInputDirection.type = 'hidden';
            orderInputDirection.name = 'order_by_direction';
            orderInputDirection.value = newOrder;

            form.appendChild(orderInputColumn);
            form.appendChild(orderInputDirection);

            // Envoyer le formulaire
            form.submit();
        });
    });
});

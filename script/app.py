from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__)

# Configuration de la connexion MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'bdfilms'
}

# Correspondance entre noms originaux et noms traduits
column_translations = {
    'movie_id': 'ID du Film',
    'title': 'Titre',
    'release_year': 'Année de Sortie',
    'runtime': 'Durée (min)',
    'original_language': 'Langue Originale',
    'genres': 'Genres',
    'revenue': 'Recettes ($)'
}

@app.route('/', methods=['GET', 'POST'])
def index():
    results = None
    error = None
    
    available_columns = list(column_translations.keys())

    selected_columns = []
    conditions = []

    order_by_column = None
    order_by_direction = None

    if request.method == 'POST':
        selected_columns = request.form.getlist('columns')
        order_by_column = request.form.get('order_by_column', None)
        order_by_direction = request.form.get('order_by_direction', None)

        # Récupération des conditions 
        for i in range(1, 8):  # Max 7 conditions
            colonne_condition = request.form.get(f'column_{i}')
            valeur = request.form.get(f'value_{i}')
            if colonne_condition and valeur:
                # Traduction du nom de la colonne
                colonne_condition_traduite = column_translations.get(colonne_condition, colonne_condition)

                # Détection et gestion des comparateurs
                comparateurs = ['>=', '<=', '>', '<', '=']
                condition_sql = None
                for comp in comparateurs:
                    if valeur.startswith(comp):
                        condition_sql = f"{colonne_condition} {comp} {valeur[len(comp):].strip()}"
                        break

                if not condition_sql:
                    if colonne_condition in ['title', 'genres', 'original_language']:
                        condition_sql = f"{colonne_condition} LIKE '%{valeur}%'"
                    else:
                        condition_sql = f"{colonne_condition} = '{valeur}'"

                # Ajouter la condition SQL complète à la liste
                conditions.append({
                    'column': colonne_condition,
                    'column_traduit': colonne_condition_traduite,
                    'value': valeur,
                    'sql': condition_sql
                })

        try:
            if not selected_columns:
                raise ValueError("Veuillez sélectionner au moins une colonne à afficher.")

            # Construction de la requête SQL
            columns_str = ', '.join(selected_columns)
            where_clause = " AND ".join([cond['sql'] for cond in conditions]) if conditions else "1"

            # Ajout du tri si défini
            order_clause = ""
            if order_by_column and order_by_direction and order_by_direction != 'none':
                order_clause = f"ORDER BY {order_by_column} {order_by_direction}"
            else:
                order_clause = ""


            query = f"SELECT {columns_str} FROM films WHERE {where_clause} {order_clause}"
            print("Requête SQL générée :", query) 

            # Exécution de la requête
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()
            cursor.execute(query)

            if cursor.description:
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()
                if not rows:
                    results = "Aucun résultat trouvé."
                else:
                    results = {
                        'columns': columns,
                        'rows': rows
                    }
            else:
                results = f"Commande exécutée avec succès : {cursor.rowcount} ligne(s) affectée(s)."

            cursor.close()
            conn.close()
        except (mysql.connector.Error, ValueError) as e:
            error = f"Erreur : {str(e)}"

    return render_template(
        'index.html',
        results=results,
        error=error,
        available_columns=available_columns,
        selected_columns=selected_columns,
        conditions=conditions,
        column_translations=column_translations,
        order_by_column=order_by_column,
        order_by_direction=order_by_direction
    )

if __name__ == '__main__':
    app.run(debug=True)

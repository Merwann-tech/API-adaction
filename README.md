# API-adaction

Ce projet nécessite la création d'un fichier `.env` pour configurer les variables d'environnement (base de données, ports, etc.).

## Installation

### Configuration du fichier `.env`

Le fichier `.env` doit contenir au minimum les variables suivantes :

```env
PORT=3000
ID_ADMIN=1
ACCESS_SECRET="exemple"
```

Adaptez les valeurs selon vos besoins.

1. **Cloner le dépôt**  
    ```bash
    git clone <url-du-repo>
    cd API-adaction
    ```

2. **Créer le fichier `.env`**  
    Copiez le fichier `.env.example` en `.env` et renseignez les valeurs nécessaires.

3. **Installer les dépendances**  
    ```bash
    npm install
    ```

4. **Créer la base de données**  

    Nommez la base de données `database.db` lors de sa création.
    Utilisez les fichiers SQL fournis (`schema.sql`, `data.sql`, etc.) pour créer la structure et insérer les données dans votre base de données.

    Exemple avec MySQL :
    ```bash
    mysql -u <user> -p <database> < schema.sql
    mysql -u <user> -p <database> < data.sql
    ```

## Démarrage

Pour démarrer l'application Node.js, assurez-vous que toutes les dépendances sont installées et que le fichier `.env` est correctement configuré. Ensuite, lancez la commande suivante :

```bash
node app.js
```

## Notes
Par défaut, un compte administrateur est créé lors de l'initialisation de la base de données. Ce compte utilise l'identifiant `admin@admin.com` et le mot de passe `1234`.

- Assurez-vous que le fichier `.env` est correctement configuré.
- La base de données doit être créée avant de lancer l'application.

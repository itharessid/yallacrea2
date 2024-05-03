const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'yallacrea'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

// Fonction pour récupérer l'utilisateur depuis la base de données
const getUserFromDatabase = async (email) => {
    return new Promise((resolve, reject) => {
        const getUserSql = 'SELECT * FROM etudiants WHERE email = ?';
        db.query(getUserSql, [email], async (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête SQL :', err);
                reject(err);
                return;
            }
            if (!Array.isArray(result) || result.length === 0) {
                console.log('Utilisateur non trouvé pour l\'e-mail fourni');
                resolve(null);
                return;
            }
            const user = result[0];
            console.log('Utilisateur trouvé :', user);
            resolve(user);
        });
    });
};

module.exports = { getUserFromDatabase };

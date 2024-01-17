const handleRegister = (req, res, bcrypt, db) => {
    const { email, name, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !name || !password || !emailRegex.test(email)) {
        return res.status(400).json('Invalid form submission');
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx
            .insert({
                hash: hash,
                email: email,
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date(),
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    .catch(err => {
        console.error(err);
        res.status(400).json('Unable to register');
    });
}

export default {
    handleRegister: handleRegister
};

const controller = {}

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from categoria', (err, categoria) => {
            if (err) {
                res.json(err)
            }
            console.log(categoria)
            // res.render('')
        })
    })
}

export default controller
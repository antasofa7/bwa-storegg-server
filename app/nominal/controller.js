const Nominal = require('./model')

module.exports = {
    index: async(req, res) => {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")

        const alert = { message: alertMessage, status: alertStatus }

        try {
            const nominal = await Nominal.find()
            res.render('admin/nominal/view_nominal', {
                nominal,
                alert,
                name: req.session.user.name,
                title: 'Nominal'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render('admin/nominal/create')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { coinName, coinQuantity, price } = req.body

            let nominal = await Nominal({ coinName, coinQuantity, price })
            await nominal.save()

            req.flash('alertMessage', "Data nominal berhasil disimpan.")
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params
            const nominal = await Nominal.findOne({ _id: id })
            console.log({id})
            res.render('admin/nominal/edit', {
                nominal
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params
            const { coinName, coinQuantity, price } = req.body

            const nominal = await Nominal.findOneAndUpdate({
                _id: id
            }, { coinName, coinQuantity, price })

            req.flash('alertMessage', "Data nominal berhasil diubah.")
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params
            
            await Nominal.findByIdAndRemove({ _id: id})

            req.flash('alertMessage', "Data nominal berhasil dihapus.")
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }
}
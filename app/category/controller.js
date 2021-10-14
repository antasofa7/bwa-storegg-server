const Category = require('./model')

module.exports = {
    index: async(req, res) => {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")

        const alert = { message: alertMessage, status: alertStatus }
        console.log(alert)
        try {
            const category = await Category.find()
            res.render('admin/category/view_category', {
                category,
                alert,
                name: req.session.user.name,
                title: 'Kategori'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render('admin/category/create')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { name } = req.body

            let category = await Category({ name })
            await category.save()

            req.flash('alertMessage', "Data kategori berhasil disimpan.")
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params
            const category = await Category.findOne({ _id: id })
            console.log({id})
            res.render('admin/category/edit', {
                category
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body

            const category = await Category.findOneAndUpdate({
                _id: id
            }, { name })

            req.flash('alertMessage', "Data kategori berhasil diubah.")
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params
            
            await Category.findByIdAndRemove({ _id: id})

            req.flash('alertMessage', "Data kategori berhasil dihapus.")
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}
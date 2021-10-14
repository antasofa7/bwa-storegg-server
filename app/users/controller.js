const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
    viewSignin: async(req, res) => {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")

        const alert = { message: alertMessage, status: alertStatus }

        try {
            if(req.session.user === null || req.session.user === undefined) {
                res.render('admin/users/view_signin', {
                    alert,
                    title: 'Sign In'
                })
            } else {
                res.redirect('./dashboard')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionSignin: async(req, res) => {
        try {
            const { email, password } = req.body
            const checkUser = await User.findOne({ email: email })

            if (checkUser) {
                if (checkUser.status === 'Y') {
                    const checkPassword = await bcrypt.compare(password, checkUser.password)
                    if (checkPassword) {
                        req.session.user = {
                            id: checkUser._id,
                            email: checkUser.email,
                            status: checkUser.status,
                            name: checkUser.name
                        }
                        res.redirect('/dashboard')
                    } else {
                        req.flash('alertMessage', 'Passsword yang ada masukkan tidak sesuai.')
                        req.flash('alertStatus', 'danger')
                        res.redirect('/')
                    }
                } else {
                    req.flash('alertMessage', 'Maaf status Anda belum aktif.')
                    req.flash('alertStatus', 'danger')
                    res.redirect('/')
                }
            } else {
                req.flash('alertMessage', 'Email yang Anda masukkan salah/belum terdaftar.')
                req.flash('alertStatus', 'danger')
                res.redirect('/')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionLogout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}
import { ShippingAddress } from '../models/models.js'

const ShippingAddressController = {

  async index (req, res) {
    try {
      const shippingAddresses = await ShippingAddress.findAll({
        where: { userId: req.user.id }, // ← Corregido
        order: [['isDefault', 'DESC']] // Opcional: las default primero
      })
      res.json(shippingAddresses)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    try {
      const newShipAddr = ShippingAddress.build(req.body)
      newShipAddr.userId = req.user.id

      // Si es la primera dirección, marcarla como default
      const count = await ShippingAddress.count({ where: { userId: req.user.id } })
      if (count === 0) {
        newShipAddr.isDefault = true
      }

      const shipAdr = await newShipAddr.save()
      res.status(201).json(shipAdr)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async update (req, res) {
    try {
      await ShippingAddress.update(req.body, { where: { id: req.params.shippingAddressId } })
      const updatedShipAdd = await ShippingAddress.findByPk(req.params.shippingAddressId)
      res.json(updatedShipAdd)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async markDefault (req, res) {
    try {
      const addressId = req.params.shippingAddressId

      await ShippingAddress.update(
        { isDefault: false },
        { where: { userId: req.user.id } }
      )

      const address = await ShippingAddress.findByPk(addressId)
      if (!address) {
        return res.status(404).send({ message: 'Address not found' })
      }

      address.isDefault = true
      await address.save()

      res.json(address)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async destroy (req, res) {
    try {
      const result = await ShippingAddress.destroy({
        where: { id: req.params.shippingAddressId }
      })

      if (result === 1) {
        res.json({ message: 'Successfully deleted shipping address id. ' + req.params.shippingAddressId })
      } else {
        res.status(404).send({ message: 'Address not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export default ShippingAddressController

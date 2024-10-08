import { pool } from "../database/conexion.js";

export const listarEmpresas = async (req, res) => {
    try {
        let sql = `SELECT  e.* , m.*
         FROM empresas e
         INNER JOIN municipios m ON e.municipio = m.id_municipio`

        const [results] = await pool.query(sql)

        if(results.length>0){
            res.status(200).json(results)
        }else{
            res.status(404).json({
                message: 'No hay empresas registradas'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const registrarEmpresas = async (req, res) => {
    try {
        const { razon_social, direccion, telefono, correo, municipio, jefe_inmediato } = req.body

        let sql = `INSERT INTO empresas (razon_social, direccion, telefono, correo, municipio, jefe_inmediato, estado) VALUES (?, ?, ?, ?, ?, ?, 1)`

        const [rows] = await pool.query(sql, [razon_social, direccion, telefono, correo, municipio, jefe_inmediato])

        if(rows.affectedRows>0){
            res.status(200).json({
                message: 'Empresa registrada correctamente'
            })
        }else{
            res.status(403).json({
                message: 'Error al registrar la empresa'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const actualizarEmpresas = async (req, res) => {
   const { id_empresa } = req.params
   const { razon_social, direccion, telefono, correo, municipio, jefe_inmediato, estado } = req.body
   const sql = `
   UPDATE empresas SET 
   razon_social = ?, 
   direccion = ?, 
   telefono = ?, 
   correo = ?, 
   municipio = ?, 
   jefe_inmediato = ?, 
   estado = ? 
   WHERE id_empresa = ?`;
   try {
    const [result] = await pool.query(sql, [razon_social, direccion, telefono, correo, municipio, jefe_inmediato, estado, id_empresa]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json({ message: 'Empresa actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' + error });
  }
}

export const inactivarEmpresa = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `UPDATE empresa SET estado = 2 WHERE id_empresa =?`

        const [rows] = await pool.query(sql, [id])

        if(rows.affectedRows>0){
            res.status(200).json({
                message: 'Empresa inactivada correctamente'
            })
        }else{
            res.status(403).json({
                message: 'Error al inactivar la empresa'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const activarEmpresa = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `UPDATE empresa SET estado = 1 WHERE id_empresa =?`

        const [rows] = await pool.query(sql, [id])

        if(rows.affectedRows>0){
            res.status(200).json({
                message: 'Empresa activada correctamente'
            })
        }else{
            res.status(403).json({
                message: 'Error al activar la empresa'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}
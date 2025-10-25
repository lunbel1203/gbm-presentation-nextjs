# Guía Rápida - Sistema de Tokens

## 🚀 Inicio Rápido

### Generar token para nuevo cliente
```bash
npm run token:generate "Nombre del Cliente"
```

### Ver todos los tokens
```bash
npm run token:list
```

### Deshabilitar acceso de un cliente
```bash
npm run token:disable <token-aqui>
```

### Habilitar acceso nuevamente
```bash
npm run token:enable <token-aqui>
```

---

## 📝 Ejemplo Completo

```bash
# 1. Crear token para cliente nuevo
npm run token:generate "Tesla Inc" 90

# Salida:
# 🔗 URL para el cliente:
#    https://presentacionrd.glaringmaintenance.do/?t=a1b2c3d4e5f6...

# 2. Enviar esa URL al cliente por email

# 3. Si necesitas deshabilitarlo después:
npm run token:disable a1b2c3d4e5f6...

# 4. Para ver estado de todos los clientes:
npm run token:list
```

---

## ⚠️ Importante

- Cada token es único y está asociado a un cliente específico
- Puedes habilitar/deshabilitar tokens sin eliminarlos
- Los tokens expirados se muestran con advertencia en la lista
- El archivo `data/tokens.json` NO debe subirse a git

---

## 📖 Documentación Completa

Ver [TOKEN_MANAGEMENT.md](./TOKEN_MANAGEMENT.md) para información detallada.

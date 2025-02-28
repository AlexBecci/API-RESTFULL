function handleError(res, error, customMessage = 'Error en la consulta a la base de datos') {
    console.error(error);
    res.status(500).json({ message: customMessage });
}

function handleDatabaseError(error) {
    console.error(error);
    throw new Error("Error en la consulta a la base de datos");
}

module.exports = { handleError, handleDatabaseError };

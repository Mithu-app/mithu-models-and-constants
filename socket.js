let socket = null;

const initializeMithuPackageSocket = (socketInstance) => {
  socket = socketInstance;
  console.log("Mithu package Socket initialized!");
};

const emitEvent = (event, data) => {
  if (socket) {
    socket.emit(event, data);
  } else {
    console.warn("Mithu package Socket is not initialized!");
  }
};

module.exports = { initializeMithuPackageSocket, emitEvent };

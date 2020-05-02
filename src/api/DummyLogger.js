
class DummyLogger {
  logEvent (name, properties) {
    console.log({ name, properties });
  }

  logException (error) {
    console.error(error);
  }

  logTrace (message) {
    console.log(message);
  }
}

module.exports = DummyLogger;

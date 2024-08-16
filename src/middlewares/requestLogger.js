const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    console.info(`[${method}] ${originalUrl} - ${statusCode} (${duration}ms)`);
  });

  next();
};

export { requestLogger };

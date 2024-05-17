from chromadb/chroma

# Install HTTP Basic Auth Utils
RUN apt update
RUN apt install apache2-utils -y

ENV CHROMA_SERVER_HOST="0.0.0.0"

CMD ["--workers ${CHROMA_WORKERS} --host ${CHROMA_HOST_ADDR} --port ${CHROMA_HOST_PORT} --proxy-headers --log-config ${CHROMA_LOG_CONFIG} --timeout-keep-alive ${CHROMA_TIMEOUT_KEEP_ALIVE}"]

EXPOSE 8000
FROM nginx:1.10

COPY build/public /app/askdarcel
COPY assets /app/askdarcel/assets
COPY index.html /app/askdarcel/index.html

RUN apt-get update && apt-get -y install ruby && gem install tiller

RUN rm /etc/nginx/conf.d/*

ADD docker/tiller /etc/tiller

CMD ["tiller", "-v"]

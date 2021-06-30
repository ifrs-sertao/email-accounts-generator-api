FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 6060

CMD ["npm", "run", "start"]

# Comando para criar imagem
# docker build -t ifrs/mail-builder .

# Comando para executar o container
# docker container run -d --name mail-builder -p 6060:6060 ifrs/mail-builder
# docker stack deploy -c mail-builder.yml mail-builder
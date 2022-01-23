FROM node:14-alpine3.11 

COPY ./ ./

RUN npm ci --progress=false
RUN npm run build
RUN npm prune

CMD [ "npm", "start"]
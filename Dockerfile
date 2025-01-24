FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist/deskly/3rdpartylicenses.txt ./

COPY dist/deskly/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

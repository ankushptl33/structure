<!-- prettier-ignore-start -->
This is subd module contains the Dockerfile to build and host React app as static side in Docker using nginx.

## How to use it?

1.  Build and Tag the image `docker image build . -f docker-nginx/Dockerfile -t pegasus-web:[TAG]`.
    Example `sudo docker image build . -f docker-nginx/Dockerfile -t pegasus-web:0.0.1`.
2.  To run docker image `docker run -d -p 80:80 -p 443:443[image-id]`
    Example `sudo docker run -d -p 80:80 -p 443:443 pegasus-web:0.0.1`

The application will running port 3000 in Docker.

## SSL Support

The nginx will load the SSL cert from certs folder and host the side at port 443.
<!-- prettier-ignore-end -->
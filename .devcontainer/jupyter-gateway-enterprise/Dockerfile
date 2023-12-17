FROM python:3.9-slim

#COPY jupyter_gateway_enterprise_config.py .
#COPY citros_authenticator .

RUN apt-get update --yes && \
    apt-get install --yes --no-install-recommends \
    gcc \
    python3-dev

RUN pip install jupyter-enterprise-gateway==3.2.0 ipykernel

# jupyter enterprisegateway --ip=0.0.0.0 --port_retries=0
CMD ["jupyter", "enterprisegateway", "--ip", "0.0.0.0", "--port_retries", "0", "--EnterpriseGatewayApp.allow_origin", "http://localhost:8063"]

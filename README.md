Fluxo A — Aplicativo via Git (recomendado)

- Suba a pasta facesfind/ para um repositório (GitHub/GitLab), contendo: index.html , styles.css , script.js , Dockerfile , nginx.conf , .dockerignore .
- No EasyPanel:
  - “+ Serviço” → “Aplicativo” → Fonte: “Git”.
  - Repo URL, branch.
  - Contexto/Path: facesfind/ (onde está o Dockerfile ).
  - Porta interna: 80 .
  - Adicione o domínio e ative TLS.
- A cada push na branch, o painel faz o build e atualiza o serviço.
Fluxo B — Compose com imagem Docker

- Construa e publique a imagem a partir do seu Mac:
  - docker login
  - docker build -t docker.io/<usuario>/facesfind:latest ./facesfind
  - docker push docker.io/<usuario>/facesfind:latest
- No EasyPanel:
  - “+ Serviço” → “Compose” e use:
    - version: "3.8"
      services:
      facesfind:
      image: docker.io/
      /facesfind:latest
      ports:
      - "80:80"
      restart: unless-stopped
- Mapeie o domínio para a porta 80 e ative TLS.
Fluxo C — Aplicativo via Imagem Docker

- Igual ao B para build/push da imagem.
- “+ Serviço” → “Aplicativo” → Fonte: “Imagem Docker”.
- Informe docker.io/<usuario>/facesfind:latest e porta interna 80 .
Por que não “zipar”

- EasyPanel trabalha melhor com Git (build remoto do Dockerfile) ou com imagens Docker publicadas. Zip só faria sentido se você tivesse um file manager para subir arquivos estáticos e um Nginx pré‑configurado, o que não é o padrão.
Checklist rápido

- Dockerfile e nginx.conf já estão prontos para servir o portal estático.
- Se desejar healthcheck, pode adicionar no nginx.conf :
  - location = /healthz { return 200; }
- DNS: aponte seu domínio para o IP do servidor do EasyPanel; depois adicione o domínio no serviço e habilite TLS.

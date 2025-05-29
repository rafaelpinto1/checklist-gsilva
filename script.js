
    const msalConfig = {
      auth: {
        clientId: "9f415c84-2708-4ca2-8aa8-69641dd097d0",
        authority: "https://login.microsoftonline.com/62345b7a-94ed-4671-b8f2-624e28c8253a",
        redirectUri: "https://rafaelpinto1.github.io/checklist-gsilva/"
      }
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);
    const loginRequest = {
      scopes: ["User.Read", "Sites.ReadWrite.All"]
    };

    let accessToken = "";

    document.getElementById("loginBtn").addEventListener("click", async () => {
      try {
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        msalInstance.setActiveAccount(loginResponse.account);
        const tokenResponse = await msalInstance.acquireTokenSilent(loginRequest);
        accessToken = tokenResponse.accessToken;

        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("formChecklist").style.display = "block";
        document.getElementById("status").innerText = "Logado como: " + loginResponse.account.username;
      } catch (err) {
        document.getElementById("status").innerText = "Erro no login: " + err.message;
        console.error(err);
      }
    });

    document.getElementById("formChecklist").addEventListener("submit", async (e) => {
      e.preventDefault();

      // Monta objeto fields com todos os dados do formulário
      const fields = {
        Title: document.getElementById("titulo").value,
        Motorista: document.getElementById("nomeCompleto").value,
        Data: document.getElementById("data").value,
        PlacaSider: document.getElementById("placaSider").value,
        MotoristaTrajado: document.getElementById("motoristaTrajado").value,
        SinaisSonolencia: document.getElementById("sinaisSonolencia").value,
        CursoMOPPValido: document.getElementById("cursoMOPPValido").value,
        CNHCompativel: document.getElementById("cnhCompativel").value,
         OrientacaoDirecaoSegura: document.getElementById("orientacaoDirecaoSegura").value,
        FreioFunciona: document.getElementById("freioFunciona").value,
        SistemaEletricoFunciona: document.getElementById("sistemaEletricoFunciona").value,
        EngateMangueiraSanfonada: document.getElementById("engateMangueiraSanfonada").value,
        PressaoPneusOk: document.getElementById("pressaoPneusOk").value,
        PneusConservacaoOk: document.getElementById("pneusConservacaoOk").value,
        EstepeConservacaoOk: document.getElementById("estepeConservacaoOk").value,
        ParafusosRodasApertados: document.getElementById("parafusosRodasApertados").value,
        ValvulasArSemVazamento: document.getElementById("valvulasArSemVazamento").value,
        FaixasRefletivasBoas: document.getElementById("faixasRefletivasBoas").value,
        MolasBolasBalancasOk: document.getElementById("molasBolasBalancasOk").value,
        DocumentacaoTransporteOk: document.getElementById("documentacaoTransporteOk").value,
        PlacaSiderCondicoes: document.getElementById("placaSiderCondicoes").value,
        AcessoriosCargaOk: document.getElementById("acessoriosCargaOk").value,
        LonasSiderDefeito: document.getElementById("lonasSiderDefeito").value,
        CatracasSiderFunciona: document.getElementById("catracasSiderFunciona").value,
        AssoalhoSiderCondicoes: document.getElementById("assoalhoSiderCondicoes").value,
        SiderPossuiColunaTravessa: document.getElementById("siderPossuiColunaTravessa").value,
        PortaSiderDefeito: document.getElementById("portaSiderDefeito").value,
        PinoReiQuintaRoGaviaoOk: document.getElementById("pinoReiQuintaRoGaviaoOk").value,
        VeiculoLimpo: document.getElementById("veiculoLimpo").value,
        LimpezaAntesCarregamento: document.getElementById("limpezaAntesCarregamento").value,
        PastaDocumentosNoCavalo: document.getElementById("pastaDocumentosNoCavalo").value,
        ControlePragasValido: document.getElementById("controlePragasValido").value,
        VeiculoDedicadoControle: document.getElementById("veiculoDedicadoControle").value,
        Observacoes: document.getElementById("observacoes").value,
       
       
        
      };

      try {
        

    const siteResp = await fetch("https://graph.microsoft.com/v1.0/sites/gsilvainfo.sharepoint.com:/sites/Ope", {
  headers: { Authorization: `Bearer ${accessToken}` }
});
const site = await siteResp.json();

const siteId = site.id.split(',')[1]; // pega só o GUID do site

const postResp = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists/ChecklistMotoristas/items`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  },
          body: JSON.stringify({ fields })
        });

        if (!postResp.ok) {
          const error = await postResp.json();
          throw new Error(error.error.message);
        }

        document.getElementById("status").innerText = "Checklist enviado com sucesso!";
        document.getElementById("formChecklist").reset();
      } catch (error) {
        document.getElementById("status").innerText = "Erro ao enviar: " + error.message;
      }
    });

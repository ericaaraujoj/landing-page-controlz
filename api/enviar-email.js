export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido"
        });
    }

    const { nome, telefone, mensagem } = req.body;

    try {
        const resposta = await fetch(
            "https://api.emailjs.com/api/v1.0/email/send",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    service_id: process.env.EMAILJS_SERVICE_ID,
                    template_id: process.env.EMAILJS_TEMPLATE_ID,
                    user_id: process.env.EMAILJS_PUBLIC_KEY,

                    template_params: {
                        nome,
                        telefone,
                        mensagem
                    }
                })
            }
        );

        if (!resposta.ok) {

            const erro = await resposta.text();

            console.log("ERRO EMAILJS:", erro);

            throw new Error(erro);

        }

        return res.status(200).json({
            sucesso: true
        });

    } catch(error) {

        console.log("ERRO GERAL:", error.message);

        return res.status(500).json({
            erro: error.message
        });
    }
}
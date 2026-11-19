/**
 * Worker do portfólio.
 *
 * - Serve o site estático (Astro build em ./dist) via binding ASSETS.
 * - /whatsapp e /email redirecionam usando secrets, para que telefone e
 *   e-mail não fiquem no código nem no HTML publicado.
 * - POST /api/contato envia o pedido de orçamento por e-mail via Resend.
 */

export interface Env {
  ASSETS: Fetcher;
  /** Número com DDI e DDD, só dígitos. Ex.: 5583999999999 */
  WHATSAPP_NUMBER?: string;
  /** E-mail exibido para contato direto (mailto). */
  CONTACT_EMAIL?: string;
  /** E-mail que recebe os pedidos do formulário. */
  CONTACT_TO_EMAIL?: string;
  RESEND_API_KEY?: string;
  /** Remetente verificado no Resend. Ex.: "Portfólio <contato@seudominio.com.br>" */
  RESEND_FROM?: string;
}

const WHATSAPP_TEXT = 'Olá, Sâmela! Vim pelo seu portfólio e quero conversar sobre um orçamento.';
const EMAIL_SUBJECT = 'Orçamento de conteúdo UGC';

const noStore = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };

function redirect(location: string): Response {
  return new Response(null, { status: 302, headers: { Location: location, ...noStore } });
}

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: noStore });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function field(data: Record<string, unknown>, key: string, max: number): string {
  const value = data[key];
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.RESEND_FROM) {
    console.error('Formulário sem configuração: defina RESEND_API_KEY, CONTACT_TO_EMAIL e RESEND_FROM.');
    return json({ error: 'not_configured' }, 503);
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  // Honeypot: robôs preenchem, humanos não. Finge sucesso.
  if (field(data, 'website', 200)) return json({ ok: true });

  const nome = field(data, 'nome', 120);
  const marca = field(data, 'marca', 120);
  const email = field(data, 'email', 200);
  const tipo = field(data, 'tipo', 80);
  const mensagem = field(data, 'mensagem', 4000);

  if (!nome || !mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'invalid_fields' }, 400);
  }

  const rows: [string, string][] = [
    ['Nome', nome],
    ['Marca', marca || '—'],
    ['E-mail', email],
    ['Tipo de conteúdo', tipo || '—'],
  ];
  const html = `
    <h2>Novo pedido de orçamento</h2>
    <table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('')}</table>
    <p><b>Mensagem</b></p>
    <p style="white-space:pre-wrap">${escapeHtml(mensagem)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMensagem:\n${mensagem}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Orçamento: ${marca || nome}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error('Resend falhou', res.status, await res.text());
    return json({ error: 'send_failed' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/whatsapp') {
      const number = env.WHATSAPP_NUMBER?.replace(/\D/g, '');
      if (!number) return new Response('WhatsApp não configurado.', { status: 503, headers: noStore });
      return redirect(`https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_TEXT)}`);
    }

    if (pathname === '/email') {
      if (!env.CONTACT_EMAIL) return new Response('E-mail não configurado.', { status: 503, headers: noStore });
      return redirect(`mailto:${env.CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`);
    }

    if (pathname === '/api/contato') return handleContact(request, env);

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

const reply = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/inquiries') return reply({ error: 'Not found.' }, 404);
    if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
    if (request.headers.get('Origin') !== url.origin) return reply({ error: 'Please submit from the website.' }, 403);
    if (!/^(multipart\/form-data|application\/x-www-form-urlencoded)(;|$)/i.test(request.headers.get('Content-Type') || '')) return reply({ error: 'Please use the inquiry form.' }, 415);
    if (Number(request.headers.get('Content-Length')) > 16000) return reply({ error: 'Your message is too long. Please shorten it.' }, 413);
    const limit = await env.INQUIRY_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
    if (!limit.success) return reply({ error: 'Too many attempts. Please wait a minute and try again.' }, 429);
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply({ error: 'Please complete the form.' }, 400);
      const chunks = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 16000) { await reader.cancel(); return reply({ error: 'Your message is too long. Please shorten it.' }, 413); }
        chunks.push(value);
      }
      data = await new Response(new Blob(chunks), { headers: { 'Content-Type': request.headers.get('Content-Type') } }).formData();
    } catch { return reply({ error: 'Please check the form and try again.' }, 400); }
    const get = (key) => typeof data.get(key) === 'string' ? data.get(key).trim() : '';
    if (get('website')) return reply({ ok: true });
    const name = get('name'), email = get('email'), phone = get('phone'), space = get('space'), message = get('message'), finish = get('finish');
    if (!['', 'The Club', 'The Library', 'The Screening Room'].includes(finish)) return reply({ error: 'Please choose one of the listed finish directions.' }, 400);
    if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length > 40 || space.length > 100 || message.length < 10 || message.length > 5000) {
      return reply({ error: 'Please add your name, a valid email and a message of 10–5,000 characters.' }, 400);
    }
    try {
      await env.DB.prepare('INSERT INTO inquiries (id, name, email, phone, space, message, finish) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .bind(crypto.randomUUID(), name, email, phone, space, message, finish).run();
      return reply({ ok: true }, 201);
    } catch {
      console.error(JSON.stringify({ event: 'inquiry_storage_failed' }));
      return reply({ error: 'We couldn’t save your inquiry. Please try again in a moment.' }, 503);
    }
  }
};

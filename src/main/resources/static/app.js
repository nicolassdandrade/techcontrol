const $ = id => document.getElementById(id);
let equipamentos = [], editando = null;
const situacoes = { EM_USO: 'Em uso', DISPONIVEL: 'Disponível', MANUTENCAO: 'Em manutenção' };
function erro(msg) { $('message').textContent = msg; }
async function api(url, options = {}) {
  const r = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  if (!r.ok) { let msg = `Erro HTTP ${r.status}`; try { const data = await r.json(); msg = data.detail || data.message || msg; } catch {} throw new Error(msg); }
  return r.status === 204 ? null : r.json();
}
async function carregar() { try { equipamentos = await api('/api/equipamentos'); erro(''); renderizar(); } catch(e) { erro('Não foi possível carregar os equipamentos: ' + e.message); } }
function renderizar() {
  $('total').textContent = equipamentos.length;
  $('uso').textContent = equipamentos.filter(e => e.situacao === 'EM_USO').length;
  $('disponiveis').textContent = equipamentos.filter(e => e.situacao === 'DISPONIVEL').length;
  $('manutencao').textContent = equipamentos.filter(e => e.situacao === 'MANUTENCAO').length;
  const q = $('busca').value.toLocaleLowerCase('pt-BR'), f = $('filtro').value;
  const filtrados = equipamentos.filter(e => (!f || e.situacao === f) && [e.nome,e.tipo,e.patrimonio,e.sistemaOperacional].some(v => (v || '').toLocaleLowerCase('pt-BR').includes(q)));
  $('linhas').replaceChildren(); $('empty').hidden = filtrados.length > 0;
  for (const e of filtrados) {
    const tr = document.createElement('tr');
    for (const value of [e.nome,e.tipo,e.patrimonio,e.sistemaOperacional || '—']) { const td = document.createElement('td'); td.textContent = value; tr.append(td); }
    const status = document.createElement('td'), pill = document.createElement('span'); pill.className = 'pill ' + e.situacao; pill.textContent = situacoes[e.situacao] || e.situacao; status.append(pill); tr.append(status);
    const actions = document.createElement('td'); actions.className = 'actions';
    const edit = document.createElement('button'); edit.className = 'secondary'; edit.textContent = 'Editar'; edit.onclick = () => abrir(e);
    const del = document.createElement('button'); del.className = 'danger'; del.textContent = 'Excluir'; del.onclick = () => excluir(e);
    actions.append(edit,del); tr.append(actions); $('linhas').append(tr);
  }
}
function abrir(e = null) { editando = e?.id ?? null; $('form').reset(); $('titulo').textContent = e ? 'Editar equipamento' : 'Novo equipamento'; if (e) { $('nome').value=e.nome; $('tipo').value=e.tipo; $('patrimonio').value=e.patrimonio; $('so').value=e.sistemaOperacional||''; $('situacao').value=e.situacao; $('observacoes').value=e.observacoes||''; } $('modal').showModal(); }
async function excluir(e) { if (!confirm(`Excluir o equipamento "${e.nome}"?`)) return; try { await api('/api/equipamentos/'+e.id,{method:'DELETE'}); await carregar(); } catch(err) { erro(err.message); } }
$('form').onsubmit = async ev => { ev.preventDefault(); const dados = {nome:$('nome').value.trim(),tipo:$('tipo').value.trim(),patrimonio:$('patrimonio').value.trim(),sistemaOperacional:$('so').value.trim(),situacao:$('situacao').value,observacoes:$('observacoes').value.trim()}; try { await api('/api/equipamentos'+(editando===null?'':'/'+editando),{method:editando===null?'POST':'PUT',body:JSON.stringify(dados)}); $('modal').close(); await carregar(); } catch(err) { alert('Não foi possível salvar: '+err.message); } };
$('novo').onclick=()=>abrir(); $('cancelar').onclick=()=>$('modal').close(); $('busca').oninput=renderizar; $('filtro').onchange=renderizar;
carregar();

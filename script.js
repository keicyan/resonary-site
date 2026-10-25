const menu=document.querySelector('.menu');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','メニューを開く')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');navigation.classList.toggle('open',open)});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const form=document.querySelector('#inquiry-form');
if(form){
 const topic=form.querySelector('#topic');
 const preset=new URLSearchParams(location.search).get('topic');
 if([...topic.options].some(o=>o.value===preset))topic.value=preset;
 const message=form.querySelector('#message');
 message.addEventListener('input',()=>{document.querySelector('#message-count').textContent=message.value.length.toLocaleString()+' / 2,000'});
 const review=document.querySelector('#inquiry-review');
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const target=document.querySelector('#review-fields');target.replaceChildren();
  const fields=[['お問い合わせの目的',topic.selectedOptions[0].textContent],['会社名',form.querySelector('#organization').value||'未入力'],['お名前',form.querySelector('#name').value],['メールアドレス',form.querySelector('#email').value],['お問い合わせ内容',message.value]];
  fields.forEach(([label,value])=>{const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);target.append(row)});
  form.hidden=true;review.hidden=false;review.focus();
 });
 document.querySelector('#inquiry-edit').addEventListener('click',()=>{review.hidden=true;form.hidden=false;topic.focus()});
}

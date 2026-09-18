import {
  buildExecutiveSummary,
  commercialScenario as calculateCommercialScenario,
  valueValidation,
} from './report-model.mjs';

const engines = [
  { id:'offer', label:'Offer clarity', archetype:'Invisible Value', question:'Can the right buyer quickly understand, trust and choose the offer?', aha:'The market may not be rejecting you; it may not understand your value fast enough.', colour:'#6657d9' },
  { id:'demand', label:'Demand rhythm', archetype:'Unsteady Pipeline', question:'Do qualified opportunities arrive predictably?', aha:'Revenue is carrying more uncertainty than your activity level suggests.', colour:'#4cc7b8' },
  { id:'sales', label:'Sales movement', archetype:'Leaky Sales Path', question:'Do opportunities progress without avoidable leakage?', aha:'More leads may feed the leak rather than fix growth.', colour:'#e8ae49' },
  { id:'profit', label:'Profit quality', archetype:'Fragile Economics', question:'Does growth create healthy cash and contribution?', aha:'You may be growing revenue faster than economic value.', colour:'#da6c75' },
  { id:'delivery', label:'Delivery capacity', archetype:'Delivery Ceiling', question:'Can quality and speed hold as volume grows?', aha:'The next sale may create pressure before it creates scale.', colour:'#4b78c2' },
  { id:'founder', label:'Founder leverage', archetype:'Founder Gravity', question:'Can decisions and priorities move without the founder pushing each one?', aha:'The business moves—but still through your calendar.', colour:'#8a5aa8' }
];

const questions = [
  q('offer','We can describe our ideal client, their urgent problem and our promised outcome in one sentence.','Compare your homepage, proposals and the words recent clients use.', ['No clear definition','It exists mainly in my head','Mostly clear, with some variations','One tested sentence is used consistently']),
  q('offer','Recent prospects can clearly explain why they should choose us over the obvious alternative.','Use real win/loss reasons—not your internal belief.', ['We do not know','Reasons depend on the founder explaining them','Most prospects understand the difference','Win/loss evidence shows the difference is clear']),
  q('offer','Our core offer is packaged and priced around a clear client outcome.','Check scope variation, bespoke exceptions and how proposals describe value.', ['Mostly tasks, time or custom scope','Some packages, but frequent exceptions','A clear outcome-led core with limited variation','A proven package with consistent pricing logic']),
  q('demand','We consistently create enough qualified opportunities for the next 60 days.','Look at qualified pipeline coverage, not enquiry or follower volume.', ['No visibility or insufficient pipeline','Highly uneven or founder-chased','Usually sufficient, with occasional gaps','Sufficient and evidenced by a rolling view']),
  q('demand','At least two lead sources produce suitable opportunities without the founder personally chasing each one.','Separate founder relationships from repeatable channels and referrals.', ['No repeatable source','One source or mostly founder-led','Two sources work, but consistency varies','Two or more sources perform predictably']),
  q('demand','We know which channel creates our best-fit and most profitable clients.','Compare source, conversion, deal value, retention and margin.', ['We do not track this','We have a strong hunch','We compare some channel outcomes','Current channel economics guide investment']),
  q('sales','Every live opportunity has a clear next step, owner and date.','Open the CRM or active-deal list today.', ['No reliable deal view','Managed informally or by the founder','Most live deals have these fields','All material deals are current and reviewed']),
  q('sales','We know where deals stall and the three most common reasons we lose.','Use stage ageing and loss data from the last 90 days.', ['No consistent insight','Mostly anecdotal reasons','Patterns are reviewed occasionally','Recent evidence drives sales changes']),
  q('sales','Our conversion rate and sales-cycle time are measured and reasonably stable.','Compare the last two quarters, not one strong month.', ['Not measured','Measured inconsistently','Measured with some unexplained variation','Stable enough to forecast and improve']),
  q('profit','We know gross margin by core service or product and by major client.','Include delivery cost, discounting, rework and contractor time.', ['Not known','Estimated at headline level','Known for most material work','Current margin data shapes decisions']),
  q('profit','Pricing and discount decisions follow a clear method rather than founder instinct each time.','Review the last ten proposals, concessions and approval patterns.', ['No method','Highly situational or founder-led','A method exists with some exceptions','Consistent guardrails protect value and margin']),
  q('profit','No single client loss or late payment would put the business under immediate pressure.','Review client concentration, cash buffer and debtor days.', ['One event could cause acute pressure','Exposure is material and only partly controlled','Exposure is manageable with known actions','Concentration and cash risk sit within set limits']),
  q('delivery','Our core service follows a repeatable workflow with clear ownership and hand-offs.','Ask whether two teams would deliver it in broadly the same way.', ['Work is reinvented each time','Key steps depend on individuals','The core flow is usually consistent','The flow is documented, owned and improved']),
  q('delivery','We can see capacity, work in progress, quality and rework before clients feel the problem.','Check operational measures and the weekly review—not intuition.', ['Problems appear first through clients','Visibility is late or informal','Leading signals exist for most work','A live view triggers action before service slips']),
  q('delivery','More sales can be absorbed without quality falling or the founder becoming the escalation point.','Use what happened during the last demand peak.', ['Growth immediately creates strain','Small increases expose bottlenecks','Normal growth is absorbed with occasional strain','Capacity scenarios and ownership support growth']),
  q('founder','Team members know which decisions they can make without founder approval.','Review last week’s approvals, questions and escalations.', ['Most decisions reach the founder','Boundaries are implied, not clear','Most routine decisions move independently','Decision rights are clear and consistently used']),
  q('founder','The founder spends more time on direction, clients and growth than on rescue work.','Estimate last month’s calendar honestly.', ['Mostly delivery and firefighting','Direction competes with daily rescue work','More than half is spent on high-value work','Time is intentionally protected and tracked']),
  q('founder','The business has no more than three priorities, each with an owner, measure and weekly movement.','Check the current operating review—not the annual plan.', ['Priorities are unclear or numerous','Founder holds and chases most priorities','Three priorities are visible, with some drift','Owners and measures drive a weekly rhythm'])
];

function q(engine, text, evidence, anchors){ return {engine,text,evidence,anchors}; }

const sectorProfiles = {
  agency:{label:'marketing or creative agency', noun:'client engagements', offer:'outcome-led agency proposition', demand:'qualified briefs', unit:'client or service line', capacity:'team utilisation and rework', nuance:'scope creep, client concentration and founder-led pitching'},
  msp:{label:'IT services or MSP', noun:'managed-service clients', offer:'managed-service package', demand:'qualified managed-service opportunities', unit:'contract or service line', capacity:'ticket load, SLA risk and technician capacity', nuance:'referral dependence, commoditisation and service capacity'},
  dev:{label:'software development agency', noun:'delivery engagements', offer:'productised development offer', demand:'qualified project opportunities', unit:'project or client', capacity:'bench, utilisation, rework and delivery throughput', nuance:'lumpy pipeline, utilisation and senior delivery dependency'},
  saas:{label:'B2B SaaS business', noun:'accounts', offer:'value proposition and packaged plan', demand:'qualified pipeline or product-led opportunities', unit:'segment or cohort', capacity:'activation, support load and product delivery capacity', nuance:'ARR momentum, acquisition efficiency, churn and founder-led GTM'},
  recruitment:{label:'recruitment or staffing business', noun:'client mandates', offer:'specialist recruitment proposition', demand:'qualified vacancies and client mandates', unit:'desk, client or placement type', capacity:'consultant capacity and time-to-fill', nuance:'cyclical demand, fee pressure and founder-held accounts'},
  consulting:{label:'consulting or business-services firm', noun:'client assignments', offer:'outcome-led advisory offer', demand:'qualified assignments', unit:'offer or client', capacity:'consultant utilisation and delivery leverage', nuance:'bespoke work, referral dependence and founder IP'},
  construction:{label:'construction or contracting firm', noun:'contracts', offer:'specialist contract proposition', demand:'qualified tenders and negotiated opportunities', unit:'contract or work type', capacity:'labour, subcontractor and programme capacity', nuance:'tender margin, cash timing, rework and owner escalation'},
  property:{label:'property or estate agency', noun:'instructions and managed properties', offer:'clear vendor or landlord proposition', demand:'qualified instructions', unit:'branch, service or client cohort', capacity:'case load, progression and service quality', nuance:'portal dependence, fee pressure and branch consistency'},
  training:{label:'training, events or specialist-services firm', noun:'programmes and engagements', offer:'packaged programme or service', demand:'qualified bookings', unit:'programme, event or client', capacity:'facilitator, production and delivery capacity', nuance:'seasonality, bespoke delivery and founder expertise'},
  other:{label:'service business', noun:'client engagements', offer:'outcome-led core offer', demand:'qualified opportunities', unit:'service line or client', capacity:'team capacity, work in progress and rework', nuance:'pipeline predictability, margin quality and founder dependency'}
};

const goalLabels = {pipeline:'build a steadier pipeline',conversion:'win more of the right work',margin:'improve margin and cash',capacity:'grow without delivery strain',freedom:'reduce founder dependency',focus:'align the team around priorities'};
const revenueLabels = {pre1:'under £1m',one3:'£1m–£3m',three5:'£3m–£5m',five10:'£5m–£10m',tenplus:'over £10m'};
const teamLabels = {solo:'1–3 people',small:'4–10 people',mid:'11–30 people',large:'31–60 people',larger:'61+ people'};
const revenueModelsBySector = {
  agency:[['agency_project','Projects or campaigns'],['agency_retainer','Monthly retainers'],['agency_performance','Performance or revenue-share fees'],['agency_mixed','Mixed projects and retainers']],
  msp:[['msp_recurring','Recurring managed-service contracts'],['msp_project','Implementation or transformation projects'],['msp_unit','Per-user, device or usage pricing'],['msp_mixed','Mixed recurring services and projects']],
  dev:[['dev_fixed','Fixed-price projects'],['dev_time','Time and materials'],['dev_team','Dedicated teams or development retainers'],['dev_outcome','Outcome or revenue-share fees'],['dev_mixed','Mixed delivery models']],
  saas:[['saas_subscription','Recurring subscription'],['saas_usage','Usage-based pricing'],['saas_licence','Enterprise licence or annual contract'],['saas_services','Subscription plus professional services'],['saas_mixed','Mixed SaaS pricing']],
  recruitment:[['rec_contingent','Contingency or success fees'],['rec_retained','Retained search'],['rec_contract','Contract staffing margin'],['rec_rpo','RPO or recurring talent service'],['rec_mixed','Mixed permanent and contract recruitment']],
  consulting:[['con_fixed','Fixed-fee projects'],['con_time','Day rate or time-based fees'],['con_retainer','Advisory retainers'],['con_outcome','Outcome or success fees'],['con_mixed','Mixed consulting model']],
  construction:[['build_fixed','Fixed-price contracts'],['build_cost','Cost-plus or time and materials'],['build_framework','Framework or term contracts'],['build_subcontract','Subcontracting revenue'],['build_mixed','Mixed contract model']],
  property:[['prop_commission','Sales commission'],['prop_management','Lettings or management fees'],['prop_fixed','Fixed-fee agency service'],['prop_ancillary','Referral or ancillary income'],['prop_mixed','Mixed sales and recurring fees']],
  training:[['train_programme','Per programme or event'],['train_participant','Per participant or delegate'],['train_retainer','Corporate retainer or licence'],['train_subscription','Membership or subscription'],['train_mixed','Mixed programme model']],
  other:[['other_project','Projects or one-off work'],['other_retainer','Retainers or recurring services'],['other_subscription','Subscription or licence'],['other_success','Success fee or commission'],['other_transaction','Transaction or usage fee'],['other_mixed','A mixed model']]
};
const modelLabels = Object.fromEntries(Object.values(revenueModelsBySector).flat().map(([value,label])=>[value,label.charAt(0).toLowerCase()+label.slice(1)]));
const goalTieBreak = {pipeline:['demand','offer'],conversion:['sales','offer'],margin:['profit','delivery'],capacity:['delivery','founder'],freedom:['founder','delivery'],focus:['founder','offer']};

const advisorQuotes = {
  offer:'Clarity is not cosmetic. It is the shortest route between good work and a confident buying decision.',
  demand:'Predictability begins when demand stops living only in the founder’s relationships.',
  sales:'A fuller pipeline cannot compensate for a buying path that does not move.',
  profit:'Revenue is movement. Margin tells you whether it is progress.',
  delivery:'Growth becomes scale only when quality survives the next client.',
  founder:'A business becomes stronger when good decisions no longer wait for the founder.'
};

const officialBusinessSource = 'https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release';
const insightCards = {
  offer:{text:'The UK had 5.7 million private-sector businesses at the start of 2025.',source:'Department for Business & Trade · Business Population Estimates 2025',url:officialBusinessSource},
  demand:{text:'The UK private-sector business population increased by 3.5% between 2024 and 2025.',source:'Department for Business & Trade · Business Population Estimates 2025',url:officialBusinessSource},
  sales:{text:'Only 25% of UK private-sector businesses employed anyone beyond their owners in 2025.',source:'Department for Business & Trade · Business Population Estimates 2025',url:officialBusinessSource},
  profit:{text:'SMEs generated an estimated 51% of UK private-sector turnover in 2025.',source:'Department for Business & Trade · Business Population Estimates 2025',url:officialBusinessSource},
  delivery:{text:'SMEs employed 16.9 million people—60% of UK private-sector employment—in 2025.',source:'Department for Business & Trade · Business Population Estimates 2025',url:officialBusinessSource},
  founder:{text:'75% of UK private-sector businesses had no employees beyond their owners in 2025.',source:'Department for Business & Trade · Business Population Estimates 2025',url:officialBusinessSource}
};

const benchmarkProfiles = {
  agency:{scores:{offer:7,demand:6,sales:6,profit:7,delivery:7,founder:6},signal:'UK agency benchmarks track profitability, growth and operational performance.',source:'BenchPress · UK agency benchmarks 2026',url:'https://www.thewowcompany.com/'},
  msp:{scores:{offer:7,demand:6,sales:6,profit:7,delivery:8,founder:6},signal:'43% of surveyed MSPs named acquiring new customers as an issue; 91% made profitability at least a medium priority.',source:'Datto · State of the MSP Industry, 2025 Look Ahead',url:'https://www.datto.com/wp-content/uploads/dlm_uploads/DAT-2024-State-of-the-MSP-Report-1.pdf'},
  dev:{scores:{offer:7,demand:6,sales:6,profit:7,delivery:7,founder:6},signal:'Current UK productivity evidence shows a widening gap between median and high-performing firms.',source:'ONS · UK business dynamism and productivity 2025',url:'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/bulletins/trendsinukbusinessdynamismandproductivity/latest'},
  saas:{scores:{offer:7,demand:7,sales:7,profit:7,delivery:7,founder:6},signal:'In 2026, private B2B SaaS respondents reported median spend of 15% of ARR on selling and 8% on marketing.',source:'SaaS Capital · Private B2B SaaS benchmarks 2026',url:'https://www.saas-capital.com/blog-posts/spending-benchmarks-for-private-b2b-saas-companies/'},
  recruitment:{scores:{offer:7,demand:6,sales:7,profit:7,delivery:7,founder:6},signal:'Current UK productivity evidence shows meaningful separation between typical and high-performing firms.',source:'ONS · UK business dynamism and productivity 2025',url:'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/bulletins/trendsinukbusinessdynamismandproductivity/latest'},
  consulting:{scores:{offer:7,demand:6,sales:6,profit:7,delivery:7,founder:6},signal:'The median UK non-financial business profit margin was 8.5% in the latest ONS firm-level analysis.',source:'ONS · UK business dynamism and productivity 2025',url:'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/bulletins/trendsinukbusinessdynamismandproductivity/latest'},
  construction:{scores:{offer:6,demand:6,sales:6,profit:8,delivery:8,founder:6},signal:'The 2025/26 rolling average return on cost for the official construction comparator group was 3.68%.',source:'SSRO · Construction factsheet 2025',url:'https://www.gov.uk/government/publications/2025-contract-profit-rate-assessment/construction-factsheet-2025'},
  property:{scores:{offer:7,demand:7,sales:7,profit:7,delivery:7,founder:6},signal:'Current UK productivity evidence shows meaningful separation between typical and high-performing firms.',source:'ONS · UK business dynamism and productivity 2025',url:'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/bulletins/trendsinukbusinessdynamismandproductivity/latest'},
  training:{scores:{offer:7,demand:6,sales:6,profit:7,delivery:7,founder:6},signal:'Current UK productivity evidence shows meaningful separation between typical and high-performing firms.',source:'ONS · UK business dynamism and productivity 2025',url:'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/bulletins/trendsinukbusinessdynamismandproductivity/latest'},
  other:{scores:{offer:7,demand:7,sales:7,profit:7,delivery:7,founder:7},signal:'The median UK non-financial business profit margin was 8.5% in the latest ONS firm-level analysis.',source:'ONS · UK business dynamism and productivity 2025',url:'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/bulletins/trendsinukbusinessdynamismandproductivity/latest'}
};

const engineCues = {
  offer:(c)=>`${c.firstName}, we’re testing how quickly buyers can grasp ${c.businessName}’s value.`,
  demand:(c)=>`${c.firstName}, now test whether demand for ${c.businessName} is repeatable—not simply busy.`,
  sales:(c)=>`${c.firstName}, this section follows what happens after an opportunity enters ${c.businessName}.`,
  profit:(c)=>`${c.firstName}, now separate revenue movement from real economic progress at ${c.businessName}.`,
  delivery:(c)=>`${c.firstName}, this tests whether ${c.businessName} can absorb the next sale without hidden strain.`,
  founder:(c)=>`${c.firstName}, finally, test how much of ${c.businessName} still moves through your calendar.`
};

const bands = [
  {max:2,label:'Exposed',meaning:'mostly unknown, absent or dependent on heroic effort'},
  {max:5,label:'Fragile',meaning:'some practice exists, but results vary or depend on individuals'},
  {max:7,label:'Working',meaning:'generally consistent, with selected gaps limiting scale'},
  {max:9,label:'Repeatable',meaning:'reliable, evidenced and less founder-dependent'}
];

const playbooks = {
  offer:{move:(s)=>`Test one ${s.offer} with five recent prospects`, steps:(s)=>[
    ['Find the words',`Review five wins, losses or client conversations. Capture the urgent problem, desired outcome and reason they chose—or did not choose—you.`],
    ['Write and test',`Create one sentence: “We help [specific buyer] achieve [valuable outcome] without [costly alternative].” Test comprehension before persuasion.`],
    ['Make it consistent',`Use the winning wording on one high-traffic asset and in the next five ${s.demand}. Record questions and objections.`]
  ], measures:(s)=>[`Prospects who can accurately repeat the value after one explanation`,`Conversion from first conversation to qualified next step`], consequences:(s)=>[
    ['Good work can remain invisible',`In a ${s.label}, buyers may compare surface features or price when the outcome is not immediately legible.`],
    ['Demand becomes expensive',`Marketing and referrals work harder because each opportunity needs extra explanation before trust forms.`],
    ['Bespoke selling spreads',`A weak core promise encourages exceptions and custom scope, increasing ${s.nuance}.`]
  ]},
  demand:{move:(s)=>`Build a 60-day qualified-pipeline baseline by source`, steps:(s)=>[
    ['Define “qualified”',`Set four non-negotiables: buyer fit, active problem, plausible value and a decision window. Exclude interest without intent.`],
    ['Trace the sources',`Label every live opportunity by source, founder involvement, stage and expected decision date. Separate repeatable demand from personal chasing.`],
    ['Choose the rhythm',`Back one primary and one secondary source for 30 days. Set weekly activity and quality measures for each.`]
  ], measures:(s)=>[`Qualified pipeline coverage for the next 60 days`,`Share of ${s.demand} created without direct founder chasing`], consequences:(s)=>[
    ['Revenue stays lumpy',`A busy month can conceal the next gap, particularly where ${s.nuance} already creates volatility.`],
    ['The founder becomes the channel',`Relationships may generate work, but the organisation cannot deliberately repeat or scale them.`],
    ['Teams make late decisions',`Hiring, capacity and cash choices become reactive because forward demand is not visible early enough.`]
  ]},
  sales:{move:(s)=>`Review ten recent opportunities and remove the biggest stall point`, steps:(s)=>[
    ['Reconstruct the path',`List five wins and five losses. Capture source, stages, days in stage, next-step quality and the stated decision reason.`],
    ['Find the leak',`Choose the single recurring stall—qualification, value case, proposal, stakeholder access or follow-up. Do not solve all of them.`],
    ['Change one rule',`Introduce one stage exit rule, template or meeting discipline. Use it across the next five ${s.demand}.`]
  ], measures:(s)=>[`Live opportunities with a dated next step and owner`,`Stage conversion or median days in the chosen stall stage`], consequences:(s)=>[
    ['More leads can amplify waste',`Additional ${s.demand} add activity without improving the point where buyers hesitate or disappear.`],
    ['Forecast confidence stays low',`Without stable movement and stage evidence, commercial planning rests on optimism rather than probability.`],
    ['Founder intervention becomes routine',`The founder is pulled into rescue calls and proposals because the sales path does not carry trust consistently.`]
  ]},
  profit:{move:(s)=>`Calculate real contribution for the top five ${s.unit}s`, steps:(s)=>[
    ['Build the true cost',`For the top five, include delivery time, contractor or labour cost, discount, rework, support and scope absorbed without charge.`],
    ['See the pattern',`Rank contribution—not revenue. Identify one pricing, scope or client pattern that erodes economic value.`],
    ['Protect the next deal',`Set one practical guardrail for new work: a floor, approval rule, scope boundary or payment term.`]
  ], measures:(s)=>[`Share of current revenue with known contribution margin`,`Contribution margin on the next five proposals or renewals`], consequences:(s)=>[
    ['Revenue can create weaker economics',`In a ${s.label}, volume may consume scarce capacity while discounts, rework or scope leakage reduce contribution.`],
    ['Good and bad growth look identical',`Without margin by ${s.unit}, headline revenue cannot tell you where to invest, repair or exit.`],
    ['Cash pressure arrives late',`Concentration, payment delay and delivery cost can combine before the headline P&L makes the risk obvious.`]
  ]},
  delivery:{move:(s)=>`Map one core workflow and expose its current capacity constraint`, steps:(s)=>[
    ['Follow real work',`Map one recent ${s.noun.replace(/s$/,'')} from commitment to completion. Mark owners, queues, hand-offs, rework and escalation.`],
    ['Name the constraint',`Use current evidence to select one limiting point in ${s.capacity}. Estimate usable capacity as a range, not false precision.`],
    ['Run one release',`Change one queue, ownership rule, checklist or work-in-progress limit. Review the signal weekly for four weeks.`]
  ], measures:(s)=>[`Work items visible before they become late, over budget or at risk`,`Cycle time, rework or capacity at the chosen constraint`], consequences:(s)=>[
    ['The next sale can create strain first',`Extra ${s.noun} may increase queues and escalation before they create scalable profit.`],
    ['Quality depends on who is involved',`When workflows and hand-offs vary, service consistency weakens as new people or volume enter.`],
    ['The founder absorbs exceptions',`Invisible capacity and quality signals turn the founder into the final operating control.`]
  ]},
  founder:{move:(s)=>`Move one repeated decision out of the founder’s week`, steps:(s)=>[
    ['Find the repeat',`Review one week of approvals, escalations and rescue work. Select a frequent, reversible decision with a capable owner.`],
    ['Set the boundary',`Define the outcome, decision limit, information needed and the conditions that genuinely require escalation.`],
    ['Let the system learn',`Run the hand-off for four weeks. Review outcomes at a set time rather than re-entering every decision.`]
  ], measures:(s)=>[`Founder interventions in the delegated decision each week`,`Decision time and rework within the new boundary`], consequences:(s)=>[
    ['Growth stays attached to one calendar',`Even with a capable team, decisions, ${s.demand} or delivery exceptions wait for founder attention.`],
    ['Leadership capacity is crowded out',`Direction, relationships and future growth compete with approvals and rescue work.`],
    ['Team judgement develops slowly',`People escalate what they could own when boundaries, measures and tolerance for reversible mistakes are unclear.`]
  ]}
};

const state = {context:{}, answers:Array(18).fill(null), proof:Array(18).fill(false), index:0, result:null, reportPage:0, reportEmail:'', pendingReportAction:null};
const $ = (id)=>document.getElementById(id);
const screens = ['introScreen','contextScreen','questionScreen','mirrorScreen','revealScreen','reportScreen'];

function show(id){
  screens.forEach(s=>$(s).classList.toggle('hidden',s!==id));
  window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  $('topStatus').textContent = id==='questionScreen'
    ? isDesktop()?`${engines[Math.floor(state.index/3)].label} • Engine ${Math.floor(state.index/3)+1} of 6`:`${engines[Math.floor(state.index/3)].label} • ${state.index+1} of 18`
    : id==='reportScreen' ? 'Your Bhuzen action report' : 'Private growth review • 5–6 minutes';
}
function engineIndex(id){ return engines.findIndex(e=>e.id===id); }
function engineAnswers(id){ return questions.map((q,i)=>({q,i})).filter(x=>x.q.engine===id); }
function engineScore(id){ return engineAnswers(id).reduce((sum,x)=>sum+(state.answers[x.i]??0),0); }
function bandFor(score){ return bands.find(b=>score<=b.max); }
function context(){ return state.context; }
function sector(){ return sectorProfiles[context().sector] || sectorProfiles.other; }
function benchmark(){ return benchmarkProfiles[context().sector] || benchmarkProfiles.other; }
function isDesktop(){ return window.matchMedia('(min-width: 821px)').matches; }
window.matchMedia('(min-width: 821px)').addEventListener('change',()=>{
  if(!$('questionScreen').classList.contains('hidden'))renderQuestion();
});

$('startButton').onclick=()=>show('contextScreen');
$('contextBack').onclick=()=>show('introScreen');
$('brandHome').onclick=()=>{ if(confirm('Return to the start? Your current answers will remain until you begin a new assessment.')) show('introScreen'); };
$('sector').addEventListener('change',(event)=>updateRevenueModels(event.target.value));
$('firstName').addEventListener('input',updateContextPreview);
$('businessName').addEventListener('input',updateContextPreview);
$('sector').addEventListener('change',updateContextPreview);
$('contextForm').querySelectorAll('input, select').forEach(field=>{
  field.addEventListener('input',updateContextValidity);
  field.addEventListener('change',updateContextValidity);
});

function updateContextPreview(){
  const first=$('firstName').value.trim(), business=$('businessName').value.trim();
  const sectorText=$('sector').selectedIndex>0 ? $('sector').options[$('sector').selectedIndex].text : '';
  const label=$('contextPreview').querySelector('span');
  const message=$('contextPreview').querySelector('strong');
  if(first && business){
    label.textContent='Tailored to your context';
    message.textContent=`${first}, your report will read ${business}${sectorText?` as a ${sectorText.toLowerCase()}`:''}—not as a generic SME.`;
  } else {
    label.textContent='Private by design';
    message.textContent='Your answers stay in this browser.';
  }
}

function updateContextValidity(){
  const ready=$('contextForm').checkValidity();
  $('contextSubmit').disabled=!ready;
  $('contextSubmit').setAttribute('aria-disabled',String(!ready));
  $('contextSubmit').innerHTML=ready?'Begin the six-engine review <span>→</span>':'Complete the details to begin';
}

function updateRevenueModels(sectorId, selected=''){
  const select=$('model');
  const options=revenueModelsBySector[sectorId]||[];
  select.disabled=options.length===0;
  select.innerHTML=options.length
    ? `<option value="">Choose the closest fit</option>${options.map(([value,label])=>`<option value="${value}" ${value===selected?'selected':''}>${label}</option>`).join('')}`
    : '<option value="">Choose the business type first</option>';
  updateContextValidity();
}

$('contextForm').addEventListener('submit',(event)=>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.context = Object.fromEntries(data.entries());
  state.index = 0;
  renderQuestion();
  show('questionScreen');
});

function renderQuestion(){
  const item=questions[state.index], eIdx=engineIndex(item.engine), inEngine=state.index%3;
  $('engineNumber').textContent=String(eIdx+1).padStart(2,'0');
  $('engineLabel').textContent=engines[eIdx].label;
  $('questionKicker').textContent=`Question ${String(state.index+1).padStart(2,'0')} • ${engines[eIdx].question}`;
  $('questionPersonal').textContent=inEngine===0 ? engineCues[item.engine](context()) : 'Choose the closest evidence—not the most flattering answer.';
  $('questionText').textContent=item.text;
  $('evidencePrompt').textContent=`Evidence check: ${item.evidence}`;
  $('progressText').textContent=isDesktop()?`Engine ${eIdx+1} of 6`:`${state.index+1} of 18`;
  $('progressFill').max=isDesktop()?6:18;
  $('progressFill').value=isDesktop()?eIdx+1:state.index+1;
  $('engineTicks').innerHTML=[0,1,2].map(n=>`<span class="${n<inEngine || state.answers[eIdx*3+n]!==null?'done':''}"></span>`).join('');
  $('answerOptions').innerHTML=item.anchors.map((a,n)=>`<button class="answer-option ${state.answers[state.index]===n?'selected':''}" data-score="${n}" aria-pressed="${state.answers[state.index]===n}"><span>${String.fromCharCode(65+n)}</span><b>${a}</b></button>`).join('');
  $('proofLabel').classList.toggle('hidden',state.answers[state.index]===null || state.answers[state.index]===0);
  $('proofCheck').checked=state.proof[state.index];
  $('previousQuestion').classList.toggle('is-invisible',state.index===0);
  $('nextQuestion').disabled=state.answers[state.index]===null;
  $('nextQuestion').innerHTML=state.index===17?'See my result <span>→</span>':'Continue <span>→</span>';
  document.querySelectorAll('.mobile-question-card .answer-option').forEach(btn=>btn.onclick=()=>{
    state.answers[state.index]=Number(btn.dataset.score);
    if(state.answers[state.index]===0) state.proof[state.index]=false;
    renderQuestion();
  });
  renderDesktopEngine(eIdx);
}

function renderDesktopEngine(eIdx){
  const engine=engines[eIdx], start=eIdx*3;
  const engineQuestions=questions.slice(start,start+3);
  const answered=engineQuestions.filter((_,offset)=>state.answers[start+offset]!==null).length;
  $('desktopEngineKicker').textContent=`Engine ${String(eIdx+1).padStart(2,'0')} of 06 • ${engine.question}`;
  $('desktopEngineTitle').textContent=engine.label;
  $('desktopEnginePersonal').textContent=engineCues[engine.id](context());
  $('desktopCompletion').textContent=`${answered} of 3 answered`;
  $('desktopContinueEngine').disabled=answered!==3;
  $('desktopContinueEngine').innerHTML=answered===3?'View this engine’s insight <span>→</span>':'Complete this engine';
  $('desktopPreviousEngine').classList.toggle('is-invisible',eIdx===0);
  $('desktopQuestionGroup').innerHTML=engineQuestions.map((item,offset)=>{
    const qIndex=start+offset, selected=state.answers[qIndex];
    return `<section class="desktop-question" aria-labelledby="desktop-question-${qIndex}">
      <div class="desktop-question-copy">
        <span>0${offset+1}</span>
        <h3 id="desktop-question-${qIndex}">${item.text}</h3>
        <p>${item.evidence}</p>
        <label class="desktop-proof ${selected===null||selected===0?'is-disabled':''}"><input type="checkbox" data-proof-index="${qIndex}" ${state.proof[qIndex]?'checked':''} ${selected===null||selected===0?'disabled':''}> Evidence verified</label>
      </div>
      <div class="desktop-answer-grid">${item.anchors.map((anchor,score)=>`<button type="button" class="desktop-answer ${selected===score?'selected':''}" data-question-index="${qIndex}" data-score="${score}" aria-pressed="${selected===score}"><span>${String.fromCharCode(65+score)}</span>${anchor}</button>`).join('')}</div>
    </section>`;
  }).join('');
  $('desktopQuestionGroup').querySelectorAll('.desktop-answer').forEach(button=>button.onclick=()=>{
    const qIndex=Number(button.dataset.questionIndex), score=Number(button.dataset.score);
    state.answers[qIndex]=score;
    if(score===0)state.proof[qIndex]=false;
    renderDesktopEngine(eIdx);
  });
  $('desktopQuestionGroup').querySelectorAll('.desktop-proof input').forEach(input=>input.onchange=()=>{
    state.proof[Number(input.dataset.proofIndex)]=input.checked;
  });
}

$('proofCheck').addEventListener('change',e=>{state.proof[state.index]=e.target.checked;});
$('previousQuestion').onclick=()=>{if(state.index>0){state.index--;renderQuestion();}};
$('questionBack').onclick=()=>{
  if(state.index===0)show('contextScreen');
  else {state.index=isDesktop()?Math.max(0,(engineIndex(questions[state.index].engine)-1)*3):state.index-1;renderQuestion();}
};
$('nextQuestion').onclick=()=>{
  if(state.answers[state.index]===null)return;
  if(state.index%3===2){ renderMirror(engineIndex(questions[state.index].engine)); show('mirrorScreen'); }
  else { state.index++; renderQuestion(); }
};

$('desktopPreviousEngine').onclick=()=>{
  const eIdx=engineIndex(questions[state.index].engine);
  if(eIdx>0){state.index=(eIdx-1)*3;renderQuestion();}
};
$('desktopContinueEngine').onclick=()=>{
  const eIdx=engineIndex(questions[state.index].engine);
  if(engineAnswers(engines[eIdx].id).some(x=>state.answers[x.i]===null))return;
  renderMirror(eIdx);
  show('mirrorScreen');
};

function renderMirror(eIdx){
  const e=engines[eIdx], score=engineScore(e.id), band=bandFor(score), evidence=engineAnswers(e.id).filter(x=>state.proof[x.i]).length;
  const weakest=engineAnswers(e.id).slice().sort((a,b)=>state.answers[a.i]-state.answers[b.i])[0];
  const insight=insightCards[e.id];
  const mirror = score<=5 ? e.aha : score<=7 ? `This engine is working, but one unverified gap may still limit ${goalLabels[context().goal]}.` : `This looks like a current strength. Protect what makes it repeatable as the business grows.`;
  $('mirrorEyebrow').textContent=`Engine ${eIdx+1} of 6 • ${e.label}`;
  $('mirrorGlyph').textContent=String(eIdx+1).padStart(2,'0');
  $('mirrorTitle').textContent=band.label;
  $('mirrorPersonal').textContent=`${context().firstName}, the signal carrying most weight for ${context().businessName}: ${weakest.q.anchors[state.answers[weakest.i]]}.`;
  $('mirrorCopy').textContent=mirror;
  $('mirrorBand').textContent=`${score}/9 • ${band.label}`;
  $('mirrorEvidence').textContent=`${evidence}/3 answers verified`;
  $('insightText').textContent=insight.text;
  $('insightSource').textContent=insight.source;
  $('insightCard').href=insight.url;
  $('mirrorContinue').dataset.engine=String(eIdx);
}

$('mirrorContinue').onclick=()=>{
  const eIdx=Number($('mirrorContinue').dataset.engine);
  if(eIdx===5){ calculateResult(); renderReveal(); show('revealScreen'); }
  else { state.index=(eIdx+1)*3; renderQuestion(); show('questionScreen'); }
};

function calculateResult(){
  const scores=Object.fromEntries(engines.map(e=>[e.id,engineScore(e.id)]));
  const min=Math.min(...Object.values(scores));
  const tied=engines.filter(e=>scores[e.id]===min).map(e=>e.id);
  const preferred=goalTieBreak[context().goal]||[];
  const primary=preferred.find(id=>tied.includes(id))||tied[0];
  const strongest=engines.slice().sort((a,b)=>scores[b.id]-scores[a.id])[0].id;
  const primaryEvidence=engineAnswers(primary).filter(x=>state.proof[x.i]).length;
  const totalEvidence=state.proof.filter(Boolean).length;
  const confidence=primaryEvidence>=2&&totalEvidence>=9?'High':primaryEvidence>=1&&totalEvidence>=5?'Moderate':'Verify first';
  const tieReason=tied.length>1?`${tied.length} engines shared the lowest score. ${engines.find(e=>e.id===primary).label} was selected because it is most directly connected to your 90-day goal.`:'It was the lowest-scoring engine in your response profile.';
  state.result={scores,primary,strongest,confidence,tieReason,tied};
}

function resultTitle(){
  const r=state.result, score=r.scores[r.primary];
  return score>=8?'No Exposed Constraint':engines.find(x=>x.id===r.primary).archetype;
}

function resultAha(){
  const r=state.result, e=engines.find(x=>x.id===r.primary), score=r.scores[r.primary];
  return score>=8?`Your self-report shows six repeatable engines. Stress-test ${e.label.toLowerCase()} first because it is closest to your 90-day goal—and confirm the evidence with your team.`:e.aha;
}

function renderReveal(){
  const e=engines.find(x=>x.id===state.result.primary);
  $('revealName').textContent=context().firstName;
  $('revealArchetype').textContent=resultTitle();
  $('revealAha').textContent=resultAha();
  $('revealReason').textContent=state.result.tieReason;
}

$('buildReport').onclick=()=>{
  renderReportV2();show('reportScreen');setReportPage(0,false);
};
$('editAnswers').onclick=()=>{state.index=0;renderQuestion();show('questionScreen');};
$('printReport').onclick=()=>reportUnlocked()?window.print():openEmailGate('print');
$('copySummary').onclick=async()=>{
  if(!reportUnlocked()){openEmailGate('copy');return;}
  await copyExecutiveSummary();
};
async function copyExecutiveSummary(){
  const text=buildSummaryText();
  try{await navigator.clipboard.writeText(text);toast('Executive summary copied');}catch{toast('Copy unavailable in this browser');}
}
$('restartButton').onclick=()=>{
  state.context={};state.answers.fill(null);state.proof.fill(false);state.index=0;state.reportPage=0;state.reportEmail='';
  $('contextForm').reset();updateRevenueModels('');updateContextPreview();updateContextValidity();show('introScreen');
};

$('reportEmail').addEventListener('input',updateEmailGateValidity);
$('reportConsent').addEventListener('change',updateEmailGateValidity);
$('emailGateForm').addEventListener('submit',async event=>{
  event.preventDefault();
  if(!$('reportEmail').checkValidity() || !$('reportConsent').checked)return;
  const button=$('unlockReport');
  button.disabled=true;
  button.textContent='Sending securely…';
  $('emailGateStatus').textContent='';
  try{
    await submitDiagnosticLead();
    await unlockReportAccess();
  }catch{
    $('emailGateStatus').textContent='The report could not be unlocked. Please check your connection and try again.';
    button.disabled=false;
    button.innerHTML='Send and unlock full report <span>→</span>';
  }
});
$('emailGateClose').addEventListener('click',()=>{state.pendingReportAction=null;$('emailGateStatus').textContent='';$('emailGate').close();});

function confidenceCopy(){
  const c=state.result.confidence;
  if(c==='High') return 'Most of the primary-friction answers are supported by current records or measures.';
  if(c==='Moderate') return 'Part of the result is evidenced; verify the remaining assumptions during the first week.';
  return 'The result is directionally useful, but the primary-friction answers rely mainly on judgement or unknowns.';
}

function weakestStatements(){
  return engineAnswers(state.result.primary).slice().sort((a,b)=>state.answers[a.i]-state.answers[b.i]).slice(0,2);
}

function overallHealth(){
  const total=Object.values(state.result.scores).reduce((sum,score)=>sum+score,0);
  const percent=Math.round(total/54*100);
  const label=percent<40?'At risk':percent<58?'Exposed':percent<74?'Developing':percent<88?'Healthy, with constraints':'Strong and repeatable';
  const below=engines.filter(engine=>state.result.scores[engine.id]<benchmark().scores[engine.id]);
  return {total,percent,label,below};
}

function benchmarkVerdict(engineId){
  const score=state.result.scores[engineId], reference=benchmark().scores[engineId];
  if(score>=reference+1)return 'Ahead of sector reference';
  if(score>=reference)return 'At sector reference';
  if(score>=reference-2)return 'Close, but not yet evidenced';
  return 'Below the sector reference';
}

function priorityAreas(){
  return engines.map(engine=>{
    const score=state.result.scores[engine.id], reference=benchmark().scores[engine.id];
    const weakest=engineAnswers(engine.id).slice().sort((a,b)=>state.answers[a.i]-state.answers[b.i])[0];
    return {engine,score,reference,gap:reference-score,weakest};
  }).sort((a,b)=>b.gap-a.gap || a.score-b.score).slice(0,3);
}

function commercialScenario(){
  const primaryEngine=state.result.primary;
  return calculateCommercialScenario({
    revenueBand:context().revenue,
    primaryEngine,
    score:state.result.scores[primaryEngine],
    reference:benchmark().scores[primaryEngine]
  });
}

function reportUnlocked(){ return Boolean(state.reportEmail); }
function isLocalPreview(){ return ['127.0.0.1','localhost'].includes(window.location.hostname); }

function openEmailGate(action='plan'){
  state.pendingReportAction=action;
  $('emailGateTitle').textContent=action==='print'?'Unlock and print your private report.':action==='copy'?'Unlock and copy your private report.':'Continue to the full report.';
  $('emailGateCopy').textContent=`Enter your email to send Aabhishek a concise summary of ${context().businessName}’s result and unlock sections four and five.`;
  $('reportEmail').value=state.reportEmail;
  $('reportConsent').checked=Boolean(state.reportEmail);
  $('emailGateStatus').textContent='';
  $('emailGateDisclosure').textContent=isLocalPreview()
    ? 'Local preview: no message will be sent. Production sends your name, business context, result, indicative range and 90-day priority through Web3Forms; your 18 individual answers stay in your browser.'
    : 'This sends your name, business context, result, indicative range and 90-day priority through Web3Forms. Your 18 individual answers stay in your browser.';
  $('unlockReport').innerHTML='Send and unlock full report <span>→</span>';
  updateEmailGateValidity();
  $('emailGate').showModal();
}

function updateEmailGateValidity(){
  const ready=$('reportEmail').checkValidity() && $('reportConsent').checked;
  $('unlockReport').disabled=!ready;
}

async function submitDiagnosticLead(){
  if(isLocalPreview())return;
  const c=context(), r=state.result, e=engines.find(item=>item.id===r.primary), scenario=commercialScenario();
  const payload=new FormData($('emailGateForm'));
  payload.set('name',c.firstName);
  payload.set('business_name',c.businessName);
  payload.set('subject',`Founder Friction Finder · ${c.businessName} · ${resultTitle()}`);
  payload.set('source','Founder Friction Finder');
  payload.set('primary_growth_friction',resultTitle());
  payload.set('primary_engine',e.label);
  payload.set('business_context',`${sector().label} · ${revenueLabels[c.revenue]} · ${teamLabels[c.team]} · ${modelLabels[c.model]}`);
  payload.set('stated_90_day_goal',goalLabels[c.goal]);
  payload.set('indicative_value_exposed',scenario.exposure);
  payload.set('potential_value_to_protect_or_unlock',scenario.opportunity);
  payload.set('message',buildSummaryText());
  payload.set('page_url',window.location.href);
  const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:payload});
  const result=await response.json();
  if(!response.ok || !result.success)throw new Error('Diagnostic lead delivery failed');
}

async function unlockReportAccess(){
  state.reportEmail=$('reportEmail').value.trim();
  $('emailGate').close();
  const action=state.pendingReportAction;
  state.pendingReportAction=null;
  if(action==='print')window.print();
  else if(action==='copy'){renderReportV2();setReportPage(0,false);await copyExecutiveSummary();}
  else {renderReportV2();setReportPage(3);}
}

function advisorBrief(move){
  const c=context(), s=sector(), r=state.result;
  const e=engines.find(x=>x.id===r.primary), strong=engines.find(x=>x.id===r.strongest);
  const score=r.scores[r.primary], strongScore=r.scores[r.strongest];
  const higherScale=c.revenue==='five10'||c.revenue==='tenplus'||c.team==='large'||c.team==='larger';
  const scale=higherScale
    ? `At ${revenueLabels[c.revenue]} with ${teamLabels[c.team]}, a small operating friction can compound across more clients, people and cash.`
    : `At ${revenueLabels[c.revenue]} with ${teamLabels[c.team]}, this is the point to build repeatability before complexity becomes expensive.`;
  const strength=strongScore<=2
    ? `Your first source of control is visibility: no engine is yet evidenced as repeatable.`
    : strongScore<=5
      ? `${strong.label} is the relative strength to stabilise while you address ${e.label.toLowerCase()}.`
      : `${strong.label} is the capability to lean on while you address ${e.label.toLowerCase()}.`;
  const read=score>=8
    ? `${c.firstName}, I would stress-test ${e.label.toLowerCase()} at ${c.businessName} first—not manufacture a weakness where your answers show none.`
    : `${c.firstName}, I would treat ${e.label.toLowerCase()} as the first constraint to verify at ${c.businessName}—not as a verdict on the business.`;
  const commercial=`With ${modelLabels[c.model]} in a ${s.label}, watch ${s.nuance}; that is where this pattern is most likely to become commercially visible.`;
  const firstMove=`Start with ${move.toLowerCase()}. Judge it against the two measures in this report—not by how busy the team feels.`;
  return {read,scale,strength,commercial,firstMove};
}

function escapeHtml(value){
  return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function renderReport(){
  const c=context(), s=sector(), r=state.result, e=engines.find(x=>x.id===r.primary), strong=engines.find(x=>x.id===r.strongest), plan=playbooks[r.primary], band=bandFor(r.scores[r.primary]);
  const date=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date());
  const reassess=new Date(); reassess.setDate(reassess.getDate()+30);
  const reassessDate=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(reassess);
  const consequences=plan.consequences(s);
  const steps=plan.steps(s);
  const measures=plan.measures(s);
  const move=plan.move(s);
  const weak=weakestStatements();
  const brief=advisorBrief(move);
  const safeName=escapeHtml(c.firstName), safeBusiness=escapeHtml(c.businessName);
  const rows=engines.map(en=>{
    const score=r.scores[en.id], b=bandFor(score), verified=engineAnswers(en.id).filter(x=>state.proof[x.i]).length;
    return `<div class="engine-row ${en.id===r.primary?'primary':''} ${en.id===r.strongest?'strongest':''}"><span>${en.label}</span><div class="score-track"><div class="score-fill score-${score}"></div></div><small>${score}/9 • ${b.label}<br>${verified}/3 verified</small></div>`;
  }).join('');
  const title=resultTitle(), aha=resultAha();
  const executive=`For <strong>${safeBusiness}</strong>, the first growth constraint to verify is <strong>${escapeHtml(title)}</strong>. ${escapeHtml(aha)} Your immediate opportunity is to ${escapeHtml(move.toLowerCase())}.`;
  const header=(section)=>`<header class="report-header"><strong>Bhuzen / Founder Friction Finder</strong><span>${section} • ${safeBusiness} • ${date}</span></header>`;
  $('report').innerHTML=`
    <article class="report-page" data-report-index="0" data-page="01 / 05">
      ${header('Executive mirror')}
      <div class="report-hero"><div><span class="eyebrow">${title==='No Exposed Constraint'?'Current growth position':'Primary growth friction'}</span><h1>${title}</h1></div><div class="confidence-stamp"><div><b>${r.confidence}</b><small>result confidence</small></div></div></div>
      <p class="executive-mirror">${executive}</p>
      <div class="report-callout"><span>30-day move</span><p>${move}.</p></div>
      <div class="report-meta"><span>${s.label}</span><span>${revenueLabels[c.revenue]} revenue</span><span>${teamLabels[c.team]}</span><span>${modelLabels[c.model]}</span><span>Goal: ${goalLabels[c.goal]}</span></div>
      <div class="advisor-note">
        <div class="advisor-identity"><span>Aabhishek’s perspective</span><strong>Aabhishek Siloya</strong><small>Founder, Bhuzen</small></div>
        <div class="advisor-content">
          <blockquote>“${advisorQuotes[r.primary]}”</blockquote>
          <h3>My read for ${safeName}</h3>
          <p>${escapeHtml(brief.read)}</p>
          <ul class="advisor-points">
            <li><strong>Why it matters now</strong><span>${escapeHtml(brief.scale)}</span></li>
            <li><strong>Your advantage</strong><span>${escapeHtml(brief.strength)}</span></li>
            <li><strong>Commercial watchpoint</strong><span>${escapeHtml(brief.commercial)}</span></li>
            <li><strong>First move</strong><span>${escapeHtml(brief.firstMove)}</span></li>
          </ul>
        </div>
      </div>
    </article>
    <article class="report-page" data-report-index="1" data-page="02 / 05">
      ${header('Engine profile')}
      <h2 class="report-title">Your six-engine profile</h2>
      <p class="report-intro">The profile shows internal consistency, not comparison with other firms. A low score is a useful investigation point; a high score is a capability to protect.</p>
      <div class="engine-chart">${rows}</div>
      <div class="score-legend"><span>Red = first friction to verify</span><span>Violet = current strongest engine</span></div>
      <div class="diagnostic-grid">
        <div class="diagnostic-card"><span>Why this surfaced</span><h3>${r.tieReason}</h3><p>${band.label}: ${band.meaning}.</p></div>
        <div class="diagnostic-card"><span>Confidence</span><h3>${r.confidence}</h3><p>${confidenceCopy()}</p></div>
        <div class="diagnostic-card"><span>Lowest evidence signal</span><h3>${weak[0].q.text}</h3><p>Your response: ${weak[0].q.anchors[state.answers[weak[0].i]]}.</p></div>
        <div class="diagnostic-card"><span>Current strength</span><h3>${strong.label}</h3><p>${r.scores[r.strongest]}/9. Use this capability to support the 30-day move.</p></div>
      </div>
    </article>
    <article class="report-page" data-report-index="2" data-page="03 / 05">
      ${header('Hidden consequence')}
      <h2 class="report-title">${title==='No Exposed Constraint'?`What to stress-test in ${e.label.toLowerCase()}`:`What ${e.archetype.toLowerCase()} may be costing`}</h2>
      <p class="report-intro">These are commercially plausible consequences for a ${s.label}. Treat them as hypotheses to check against your own revenue, margin, time and risk data.</p>
      <div class="consequence-list">${consequences.map(x=>`<div class="consequence"><div><h3>${x[0]}</h3><p>${x[1]}</p></div></div>`).join('')}</div>
      <div class="caution"><strong>Do not estimate “money lost” yet.</strong> First verify the constraint using the measures on the next page. Impact can then be modelled with your actual volumes, conversion, margin and time.</div>
    </article>
    <article class="report-page" data-report-index="3" data-page="04 / 05">
      ${header('30-day move')}
      <h2 class="report-title">One move. Three steps. Two measures.</h2>
      <div class="action-banner"><b>30</b><div><h3>${move}</h3><p>Suggested owner: ${r.primary==='founder'?'Founder + delegated owner':r.primary==='delivery'?'Operations or delivery lead':r.primary==='profit'?'Founder or finance lead':'Commercial lead or founder'}</p></div></div>
      <div class="week-grid">${steps.map((x,i)=>`<div class="week-card"><span>${i===0?'Week 1':i===1?'Week 2':'Weeks 3–4'}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
      <div class="measure-grid"><div class="measure-card"><span>Leading measure</span><strong>${measures[0]}</strong></div><div class="measure-card"><span>Outcome measure</span><strong>${measures[1]}</strong></div></div>
      <div class="caution">Set the current baseline before changing the system. Review movement weekly; do not wait until day 30 to discover the measure was unavailable.</div>
    </article>
    <article class="report-page" data-report-index="4" data-page="05 / 05">
      ${header('Leadership conversation')}
      <h2 class="report-title">Turn the result into a useful disagreement</h2>
      <p class="report-intro">Discuss these questions with one to three people who see the business from different positions. The goal is not consensus; it is better evidence.</p>
      <ol class="conversation-list">
        <li>Where do you see ${title.toLowerCase()} showing up in our business today?</li>
        <li>Which part of this result is supported by evidence—and which part is still a belief?</li>
        <li>If we leave this friction unchanged for 90 days, what will it affect first: revenue, margin, delivery, time or risk?</li>
        <li>What should we stop or defer so the 30-day move has a real owner and capacity?</li>
        <li>What result would cause us to keep, adapt or abandon this intervention?</li>
      </ol>
      <div class="reassess-box"><div><strong>Reassess only the ${e.label.toLowerCase()} engine</strong><p>Compare the same evidence after 30 days. A rational shift in the constraint is useful learning.</p></div><b>${reassessDate}</b></div>
      <blockquote class="share-quote">“${title==='No Exposed Constraint'?`Our next growth edge is ${e.label}`:`Our current growth friction is ${e.archetype}`}. Our next move is to ${move.toLowerCase()}.”</blockquote>
      <div class="report-links">
        <div><span>Your next step</span><h3>One decision. One conversation.</h3><p>Discuss the evidence behind this result privately.</p></div>
        <nav aria-label="Continue after this report">
          <a class="primary" href="https://aabhisheksiloya.com/#contact" target="_blank" rel="noopener noreferrer"><span>Confidential by default</span><b>Request a private conversation ↗</b></a>
        </nav>
      </div>
      <div class="caution">This report is a structured decision aid based on self-reported information. It is not a validated benchmark, financial advice or proof of root cause.</div>
    </article>`;
  setupReportNavigation();
}

function renderReportV2(){
  const c=context(), s=sector(), r=state.result, e=engines.find(item=>item.id===r.primary), strong=engines.find(item=>item.id===r.strongest), plan=playbooks[r.primary];
  const date=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date());
  const reassess=new Date(); reassess.setDate(reassess.getDate()+30);
  const reassessDate=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(reassess);
  const consequences=plan.consequences(s), steps=plan.steps(s), measures=plan.measures(s), move=plan.move(s), weak=weakestStatements();
  const health=overallHealth(), reference=benchmark(), priorities=priorityAreas(), scenario=commercialScenario(), brief=advisorBrief(move);
  const validation=valueValidation({primaryEngine:r.primary,goal:goalLabels[c.goal],revenueModel:modelLabels[c.model]});
  const safeName=escapeHtml(c.firstName), safeBusiness=escapeHtml(c.businessName), title=resultTitle(), aha=resultAha();
  const bookingUrl=`https://calendly.com/abhisheksiloiya/30min?name=${encodeURIComponent(c.firstName)}${state.reportEmail?`&email=${encodeURIComponent(state.reportEmail)}`:''}&utm_source=founder-friction-finder&utm_content=${encodeURIComponent(r.primary)}`;
  const rows=engines.map(engine=>{
    const score=r.scores[engine.id], scoreBand=bandFor(score), verified=engineAnswers(engine.id).filter(item=>state.proof[item.i]).length, target=reference.scores[engine.id];
    return `<div class="engine-row ${engine.id===r.primary?'primary':''} ${engine.id===r.strongest?'strongest':''}">
      <div class="engine-row-title"><span>${engine.label}</span><b>${benchmarkVerdict(engine.id)}</b></div>
      <div class="score-track"><div class="score-fill score-${score}"></div><i class="score-marker score-${target}"><span>Sector reference ${target}/9</span></i></div>
      <small><b>${score}/9 · ${scoreBand.label}</b><span>${verified}/3 answers evidenced</span></small>
      <p><strong>${engine.question}</strong> ${benchmarkVerdict(engine.id)}.</p>
    </div>`;
  }).join('');
  const executive=`Your stated 90-day priority is to <strong>${escapeHtml(goalLabels[c.goal])}</strong>. For <strong>${safeBusiness}</strong>, <strong>${escapeHtml(title)}</strong> is the first constraint to verify. ${escapeHtml(aha)} The capability to lean on while you test it is <strong>${strong.label}</strong>.`;
  const header=section=>`<header class="report-header"><strong>Bhuzen / Founder Friction Finder</strong><span>${section} • ${safeBusiness} • ${date}</span></header>`;
  const roadmap=[
    {week:'Week 1',title:'Establish the evidence',action:`Test the two weakest ${e.label.toLowerCase()} signals. First: ${weak[0].q.text} Then: ${weak[1].q.text}`,milestone:'A named owner and a documented starting baseline.',outcome:'The team can separate the real constraint from opinion.'},
    {week:'Week 2',title:steps[0][0],action:steps[0][1],milestone:'The first operating definition or boundary is agreed.',outcome:`A usable foundation for the 90-day priority: ${goalLabels[c.goal]}.`},
    {week:'Week 3',title:steps[1][0],action:steps[1][1],milestone:'One live test is completed with current business data.',outcome:'The key assumption is confirmed, refined or rejected.'},
    {week:'Week 4',title:steps[2][0],action:steps[2][1],milestone:'Day-30 evidence is reviewed against the baseline.',outcome:'A clear decision to keep, adapt or stop the move.'}
  ];

  $('report').innerHTML=`
    <article class="report-page" data-report-index="0" data-page="01 / 05">
      ${header('Six-engine health profile')}
      <div class="report-opening report-opening-health health-hero">
        <div><span class="eyebrow">Your growth-system health</span><h1>${health.label}</h1><p>${health.below.length} of six engines sit below the Bhuzen sector reference for a ${s.label}.</p></div>
        <div class="health-dial"><svg class="health-meter" viewBox="0 0 42 42" aria-hidden="true"><circle class="health-meter-track" cx="21" cy="21" r="16" pathLength="100"></circle><circle class="health-meter-value" cx="21" cy="21" r="16" pathLength="100" stroke-dasharray="${health.percent} 100"></circle></svg><div><b>${health.percent}%</b><span>overall health</span></div></div>
      </div>
      <h2 class="report-title">The six-engine profile</h2>
      <p class="report-intro">Read this as a map of the evidence: where ${safeBusiness} appears resilient, where the system is exposed and which questions deserve leadership attention now.</p>
      <div class="engine-chart benchmark-chart">${rows}</div>
      <div class="score-legend"><span><i class="legend-fill"></i>Your score</span><span><i class="legend-marker"></i>Bhuzen sector reference</span><span>Reference = evidence threshold, not a percentile</span></div>
      <div class="priority-block">
        <div class="priority-heading"><span>Priority areas</span><h3>What needs attention first</h3></div>
        <div class="priority-grid">${priorities.map((item,index)=>`<div class="priority-card ${index===0?'top-priority':''}"><span>0${index+1} · ${item.engine.label}</span><h3>${benchmarkVerdict(item.engine.id)}</h3><p>${item.weakest.q.text}</p><small>Your evidence: ${item.weakest.q.anchors[state.answers[item.weakest.i]]}.</small></div>`).join('')}</div>
      </div>
      <a class="benchmark-source" href="${reference.url}" target="_blank" rel="noopener noreferrer"><span>Latest sector signal</span><strong>${reference.signal}</strong><small>${reference.source} ↗</small></a>
    </article>

    <article class="report-page" data-report-index="1" data-page="02 / 05">
      ${header('Executive mirror')}
      <section class="report-opening report-opening-mirror">
        <div class="report-opening-grid"><div><span class="eyebrow">${title==='No Exposed Constraint'?'Current growth position':'Primary growth friction'}</span><h1>${title}</h1></div><aside class="report-opening-note"><span>Your 90-day priority</span><strong>${goalLabels[c.goal]}</strong><small>${r.confidence} result confidence</small></aside></div>
        <p class="executive-mirror">${executive}</p>
        <div class="report-callout"><span>The question now</span><p>${e.question}</p></div>
      </section>
      <div class="report-meta"><span>${s.label}</span><span>${revenueLabels[c.revenue]} revenue</span><span>${teamLabels[c.team]}</span><span>${modelLabels[c.model]}</span><span>Goal: ${goalLabels[c.goal]}</span></div>
      <div class="advisor-note">
        <div class="advisor-identity"><span>Aabhishek’s perspective</span><strong>Aabhishek Siloya</strong><small>Founder, Bhuzen</small></div>
        <div class="advisor-content">
          <blockquote>“${advisorQuotes[r.primary]}”</blockquote>
          <h3>My read for ${safeName}</h3>
          <p>${escapeHtml(brief.read)}</p>
          <ul class="advisor-points">
            <li><strong>Why it matters now</strong><span>${escapeHtml(brief.scale)}</span></li>
            <li><strong>Your advantage</strong><span>${escapeHtml(brief.strength)}</span></li>
            <li><strong>Commercial watchpoint</strong><span>${escapeHtml(brief.commercial)}</span></li>
            <li><strong>Leadership focus</strong><span>Confirm the evidence before committing the business to another initiative.</span></li>
          </ul>
        </div>
      </div>
    </article>

    <article class="report-page" data-report-index="2" data-page="03 / 05">
      ${header('Cost and opportunity')}
      <section class="report-opening report-opening-commercial">
        <div class="report-opening-grid"><div><span class="eyebrow">Commercial perspective</span><h2 class="report-title">What may be at stake—and what could move</h2></div><aside class="report-opening-note"><span>First constraint to verify</span><strong>${e.label}</strong><small>${scenario.methodology.gap} below the sector evidence threshold</small></aside></div>
        <p class="report-intro">For ${safeBusiness}, this range connects your ${revenueLabels[c.revenue]} revenue band with the ${e.label.toLowerCase()} evidence in your answers. It is a commercial hypothesis to test, not a forecast.</p>
      </section>
      <div class="commercial-headlines">
        <div class="commercial-card cost"><small>If this remains unresolved</small><span>Indicative annual value exposed</span><strong>${scenario.exposure}</strong><p>The range of value that may remain vulnerable while the current pattern continues.</p></div>
        <div class="commercial-card benefit"><small>If the constraint improves</small><span>Potential value to protect or unlock</span><strong>${scenario.opportunity}</strong><p>${escapeHtml(validation.benefit)}</p></div>
      </div>
      <div class="scenario-method"><span>How this range was built</span><dl><div><dt>Revenue modelled</dt><dd>${scenario.methodology.revenue}</dd></div><div><dt>Engine scenario rate</dt><dd>${scenario.methodology.rate}</dd></div><div><dt>Sector-reference gap</dt><dd>${scenario.methodology.gap}</dd></div><div><dt>Severity applied</dt><dd>${scenario.methodology.severity}</dd></div></dl><p>Published sector evidence informs the Bhuzen evidence threshold. The monetary range uses Bhuzen scenario parameters and your self-reported inputs; it is not a peer percentile or audited loss.</p></div>
      <div class="consequence-list">${consequences.map(item=>`<div class="consequence"><div><h3>${item[0]}</h3><p>${item[1]}</p></div></div>`).join('')}</div>
      <div class="caution"><strong>Before making a financial decision:</strong> replace this indicative range with actual conversion, contribution, capacity, cost and founder-time data.</div>
      <button class="button button-primary plan-unlock" id="unlockPlanFromReport">Continue to my tailored 30-day plan <span>→</span></button>
    </article>

    <article class="report-page" data-report-index="3" data-page="04 / 05">
      ${header('30-day plan')}
      <section class="report-opening report-opening-plan">
        <div class="report-opening-grid"><div><span class="eyebrow">One focused intervention</span><h2 class="report-title">A 30-day plan built around your evidence</h2></div><aside class="report-opening-note"><span>Decision at day 30</span><strong>Keep, adapt or stop</strong><small>Judge the move by evidence—not activity.</small></aside></div>
        <p class="report-intro">This plan is shaped for a ${s.label} using ${modelLabels[c.model]}, your ${revenueLabels[c.revenue]} revenue band and the specific ${e.label.toLowerCase()} signals in your answers.</p>
        <div class="action-banner"><b>30</b><div><h3>${move}</h3><p>Suggested owner: ${r.primary==='founder'?'Founder + delegated owner':r.primary==='delivery'?'Operations or delivery lead':r.primary==='profit'?'Founder or finance lead':'Commercial lead or founder'}</p></div></div>
      </section>
      <div class="roadmap">${roadmap.map((phase,index)=>`<article class="roadmap-phase"><div class="roadmap-marker"><span>${index+1}</span></div><div class="roadmap-copy"><span>${phase.week}</span><h3>${phase.title}</h3><p>${phase.action}</p><div><small>Milestone</small><strong>${phase.milestone}</strong></div><div><small>Expected outcome</small><strong>${phase.outcome}</strong></div></div></article>`).join('')}</div>
      <div class="measure-grid"><div class="measure-card"><span>Leading measure</span><strong>${measures[0]}</strong></div><div class="measure-card"><span>Outcome measure</span><strong>${measures[1]}</strong></div></div>
      <section class="value-validation" aria-labelledby="value-validation-title"><header><span>Value validation</span><h3 id="value-validation-title">Turn the estimate into evidence.</h3><p>The first 30 days do not promise the annual range. They establish whether it is real, what is addressable and what deserves further investment.</p></header><div class="value-validation-grid"><div><span>Baseline to establish</span><p>${escapeHtml(validation.baseline)}</p></div><div><span>Calculation once actuals are known</span><p>${escapeHtml(validation.calculation)}</p></div><div><span>Intended benefit</span><p>${escapeHtml(validation.benefit)}</p></div></div><footer><p>${escapeHtml(validation.context)}</p><strong>${escapeHtml(validation.goalConnection)}</strong></footer></section>
      <div class="caution"><strong>Day-30 decision:</strong> keep, adapt or stop the move based on the two measures—not on how busy the work felt. Reassess ${e.label.toLowerCase()} on ${reassessDate}.</div>
    </article>

    <article class="report-page" data-report-index="4" data-page="05 / 05">
      ${header('Private conversation')}
      <div class="report-opening report-opening-conversation conversation-opening"><span>A private note from Aabhishek</span><h2>Your result deserves one honest conversation.</h2><blockquote>“The value of this report is not the score. It is the decision you are now willing to make—and the evidence you use to make it.”</blockquote><p>${safeName}, ${safeBusiness} does not need another generic growth prescription. It needs clarity on whether ${e.label.toLowerCase()} is the constraint worth acting on now.</p></div>
      <h3 class="conversation-subtitle">Use these questions with your leadership team</h3>
      <ol class="conversation-list">
        <li>Where do you see ${title.toLowerCase()} showing up in our business today?</li>
        <li>Which part of this result is supported by evidence—and which part is still a belief?</li>
        <li>If we leave this friction unchanged for 90 days, what will it affect first: revenue, margin, delivery, time or risk?</li>
      </ol>
      <div class="report-links report-links-single">
        <div><span>Your next step</span><h3>One decision. One conversation.</h3><p>Bring the result and the decision behind it. No pitch; just an honest discussion about what the evidence suggests.</p></div>
        <nav aria-label="Continue after this report">
          <a class="primary" href="${bookingUrl}" target="_blank" rel="noopener noreferrer"><span>30 minutes · confidential by default</span><b>Book a private conversation ↗</b></a>
        </nav>
      </div>
      <div class="caution">This report is a structured decision aid based on self-reported information. Bhuzen sector references are evidence thresholds informed by current sector research; they are not percentile rankings, financial advice or proof of root cause.</div>
    </article>`;
  setupReportNavigation();
  $('unlockPlanFromReport').onclick=()=>reportUnlocked()?setReportPage(3):openEmailGate('plan');
}

const reportSections=['Six-engine health','Executive mirror','Cost & opportunity','30-day plan','Private conversation'];

function setupReportNavigation(){
  $('reportNav').innerHTML=reportSections.map((label,index)=>`<button type="button" data-report-page="${index}"><span>0${index+1}</span>${label}</button>`).join('');
  $('reportNav').querySelectorAll('button').forEach(button=>button.onclick=()=>{
    const target=Number(button.dataset.reportPage);
    if(target>=3 && !reportUnlocked())openEmailGate('plan'); else setReportPage(target);
  });
}

function centreActiveReportTab(button){
  if(!button || !window.matchMedia('(max-width: 820px)').matches)return;
  const nav=$('reportNav');
  const left=Math.max(0,button.offsetLeft-(nav.clientWidth-button.offsetWidth)/2);
  nav.scrollTo({left,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}

function setReportPage(index,scroll=true){
  const pages=[...document.querySelectorAll('.report-page')];
  if(!pages.length)return;
  state.reportPage=Math.max(0,Math.min(index,pages.length-1));
  pages.forEach((page,pageIndex)=>{
    const active=pageIndex===state.reportPage;
    page.classList.toggle('active-report-page',active);
    page.setAttribute('aria-hidden',String(!active));
  });
  let activeButton=null;
  $('reportNav').querySelectorAll('button').forEach((button,buttonIndex)=>{
    const active=buttonIndex===state.reportPage;
    button.classList.toggle('active',active);
    if(active){button.setAttribute('aria-current','page');activeButton=button;} else button.removeAttribute('aria-current');
  });
  centreActiveReportTab(activeButton);
  $('reportPosition').textContent=`Section ${state.reportPage+1} of ${pages.length}`;
  $('previousReportSection').disabled=state.reportPage===0;
  $('nextReportSection').textContent=state.reportPage===pages.length-1?'Back to summary ↑':'Next section →';
  if(scroll)window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}

$('previousReportSection').onclick=()=>setReportPage(state.reportPage-1);
$('nextReportSection').onclick=()=>{
  const target=state.reportPage===4?0:state.reportPage+1;
  if(target>=3 && !reportUnlocked())openEmailGate('plan'); else setReportPage(target);
};

function buildSummaryText(){
  const c=context(), r=state.result, e=engines.find(x=>x.id===r.primary), strong=engines.find(x=>x.id===r.strongest), s=sector(), plan=playbooks[r.primary];
  const scenario=commercialScenario(), measures=plan.measures(s);
  return buildExecutiveSummary({
    businessName:c.businessName,
    sector:s.label,
    revenue:revenueLabels[c.revenue],
    team:teamLabels[c.team],
    revenueModel:modelLabels[c.model],
    goal:goalLabels[c.goal],
    resultTitle:resultTitle(),
    primaryEngine:e.label,
    confidence:r.confidence,
    finding:resultAha(),
    strongestEngine:strong.label,
    exposure:scenario.exposure,
    opportunity:scenario.opportunity,
    move:plan.move(s),
    leadingMeasure:measures[0],
    outcomeMeasure:measures[1]
  });
}

function toast(message){$('toast').textContent=message;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2200);}

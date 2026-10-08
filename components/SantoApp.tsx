'use client';
import {cloneElement,isValidElement,useEffect,useMemo,useState} from 'react';
import type {ComponentProps,ReactElement,ReactNode} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import Link from 'next/link';
import {Bell,BriefcaseBusiness,Building2,CalendarDays,ChartNoAxesCombined,ClipboardCheck,ClipboardList,Coins,FileArchive,FileSignature,FileText,FolderKanban,HardHat,LayoutDashboard,LogOut,Menu,PackageSearch,PanelLeftClose,PanelLeftOpen,Plus,Search,Settings,ShieldCheck,ShoppingCart,Truck,Users,Warehouse, X, Wrench, ArrowUpRight, CheckCircle2, AlertTriangle, Clock3, MoreHorizontal} from 'lucide-react';
import {useLanguage} from '@/components/LanguageProvider';
import {projects,tasks,employees,materials,suppliers,equipment,invoices,documents} from '@/lib/mock-data';

const nav=[
 {key:'overview',href:'/app',icon:LayoutDashboard,group:'OPERATIONS'},
 {key:'projects',href:'/app/projects',icon:FolderKanban,group:'OPERATIONS'},
 {key:'field',href:'/app/field',icon:HardHat,group:'OPERATIONS'},
 {key:'tasks',href:'/app/tasks',icon:ClipboardList,group:'OPERATIONS'},
 {key:'schedule',href:'/app/schedule',icon:CalendarDays,group:'OPERATIONS'},
 {key:'accounting',href:'/app/accounting',icon:Coins,group:'FINANCE'},
 {key:'hr',href:'/app/hr',icon:Users,group:'PEOPLE'},
 {key:'materials',href:'/app/materials',icon:Warehouse,group:'SUPPLY CHAIN'},
 {key:'procurement',href:'/app/procurement',icon:ShoppingCart,group:'SUPPLY CHAIN'},
 {key:'suppliers',href:'/app/suppliers',icon:Building2,group:'SUPPLY CHAIN'},
 {key:'equipment',href:'/app/equipment',icon:Truck,group:'SUPPLY CHAIN'},
 {key:'safety',href:'/app/safety',icon:ShieldCheck,group:'COMPLIANCE'},
 {key:'documents',href:'/app/documents',icon:FileArchive,group:'RESOURCES'},
 {key:'contracts',href:'/app/contracts',icon:FileSignature,group:'RESOURCES'},
 {key:'reports',href:'/app/reports',icon:ChartNoAxesCombined,group:'INSIGHTS'},
 {key:'estimating',href:'/app/estimating',icon:ClipboardCheck,group:'PRECONSTRUCTION'},
 {key:'boq',href:'/app/boq',icon:FileText,group:'PRECONSTRUCTION'},
 {key:'rfis',href:'/app/rfis',icon:FileText,group:'PROJECT CONTROLS'},
 {key:'submittals',href:'/app/submittals',icon:FileCheckIcon,group:'PROJECT CONTROLS'},
 {key:'qaqc',href:'/app/qaqc',icon:CheckCircle2,group:'PROJECT CONTROLS'},
 {key:'subcontractors',href:'/app/subcontractors',icon:Users,group:'PROJECT CONTROLS'},
 {key:'meetings',href:'/app/meetings',icon:CalendarDays,group:'PROJECT CONTROLS'},
 {key:'drawings',href:'/app/drawings',icon:FileArchive,group:'PROJECT CONTROLS'},
 {key:'closeout',href:'/app/closeout',icon:ClipboardCheck,group:'PROJECT CONTROLS'},
 {key:'settings',href:'/app/settings',icon:Settings,group:'SYSTEM'},
];
function FileCheckIcon(p:ComponentProps<typeof FileText>){return <FileText {...p}/>}
const labelKeys=nav.reduce<Record<string,string>>((a,n)=>(a[n.key]=n.key,a),{});

const UI_AR:Record<string,string>={
 'Santo':'سانتو',
 'Project':'مشروع',
 'Task':'المهمة',
 'Employee':'الموظف',
 'Material':'المادة',
 'Supplier':'المورد',
 'Equipment':'المعدات',
 'Invoice':'فاتورة',
 'Document':'مستند',
 'Contract':'العقد',
 'Report':'التقرير',
 'RFI':'طلب معلومات',
 'Submittal':'طلب اعتماد',
 'Meeting':'اجتماع',
 'Drawing':'الرسم',
 'Inspection':'الفحص',
 'Status':'الحالة',
 'Priority':'الأولوية',
 'Amount':'المبلغ',
 'Value':'القيمة',
 'Budget':'الميزانية',
 'Deadline':'الموعد النهائي',
 'Date':'التاريخ',
 'Role':'الدور',
 'Department':'القسم',
 'Type':'النوع',
 'Owner':'المالك',
 'Assignee':'المسؤول',
 'Description':'الوصف',
 'Category':'الفئة',
 'Location':'الموقع',
 'Manager':'المدير',
 'Client':'العميل',
 'Progress':'الإنجاز',
 'Reference':'المرجع',
 'Version':'الإصدار',
 'Updated':'آخر تحديث',
 'Format':'التنسيق',
 'Scope':'النطاق',
 'Party':'الطرف',
 'Expiry':'الانتهاء',
 'Package':'الحزمة',
 'Reviewer':'المراجع',
 'Score':'النتيجة',
 'Due':'مستحق',
 'Unit':'الوحدة',
 'Stock':'المخزون',
 'Rating':'التقييم',
 'Utilization':'معدل الاستخدام',
 'Next maintenance':'الصيانة القادمة',
 'Site':'الموقع',
 'Workers':'العمال',
 'Issues':'المشكلات',
 'Project performance':'أداء المشروعات',
 'Recent activity':'آخر الأنشطة',
 'Site issues':'مشكلات المواقع',
 'Financial snapshot':'الملخص المالي',
 'Upcoming':'القادم',
 'Ready':'جاهز',
 'Open':'مفتوح',
 'Closed':'مغلق',
 'Approved':'معتمد',
 'Active':'نشط',
 'Current':'حالي',
 'Confirmed':'مؤكد',
 'Scheduled':'مجدول',
 'Planned':'مخطط',
 'Review':'مراجعة',
 'Pending':'معلق',
 'In progress':'قيد التنفيذ',
 'Delayed':'متأخر',
 'At risk':'معرض للخطر',
 'On track':'على المسار',
 'Near Completion':'قريب من الإنجاز',
 'Low':'منخفض',
 'Medium':'متوسط',
 'High':'مرتفع',
 'Completed':'مكتمل',
 'Ordered':'تم الطلب',
 'Delivered':'تم الاستلام',
 'In transit':'قيد الشحن',
 'Configured':'مُهيأ',
 'Filed':'مُسجل',
 'Under review':'قيد المراجعة',
 'Awaiting response':'في انتظار الرد',
 'Quote review':'مراجعة العروض',
 'Over budget':'تجاوز الميزانية',
 'Action needed':'يحتاج إجراء',
 'Revise & resubmit':'تعديل وإعادة تقديم',
 'Passed':'ناجح',
 'Watch':'مراقبة',
 'Pending approval':'في انتظار الموافقة',
 'In use':'قيد الاستخدام',
 'Maintenance':'الصيانة',
 'Available':'متاحة',
 'WORKSPACE':'مساحة العمل',
 'OPERATIONS':'العمليات',
 'FINANCE':'المالية',
 'PEOPLE':'الأفراد',
 'SUPPLY CHAIN':'سلسلة الإمداد',
 'COMPLIANCE':'الامتثال',
 'RESOURCES':'الموارد',
 'INSIGHTS':'الرؤى',
 'PRECONSTRUCTION':'ما قبل التنفيذ',
 'PROJECT CONTROLS':'ضوابط المشروع',
 'SYSTEM':'النظام',
 'NEED HELP?':'تحتاج مساعدة؟',
 'Review workspace guidance, approvals, and help resources.':'راجع إرشادات مساحة العمل والموافقات وموارد المساعدة.',
 'Open support':'فتح الدعم',
 'Santo / ':'سانتو / ',
 'CONSTRUCTION OPERATIONS':'عمليات الإنشاء',
 'Create something new.':'أنشئ شيئًا جديدًا.',
 'Action completed for demo.':'تم تنفيذ الإجراء في النسخة التجريبية.',
 'Live demo data · Front-end workflow preview.':'بيانات تجريبية مباشرة · معاينة لواجهة التشغيل الأمامية.',
 'Good morning, Ahmed.':'صباح الخير يا أحمد.',
 'Here is what needs your attention.':'إليك ما يحتاج إلى اهتمامك.',
 'New project':'مشروع جديد',
 'Daily site report':'تقرير موقع يومي',
 'Daily report':'تقرير يومي',
 'Filters':'الفلاتر',
 'Active projects':'المشروعات النشطة',
 'Projects at risk':'المشروعات المعرضة للخطر',
 'Average progress':'متوسط الإنجاز',
 'Open issues':'المشكلات المفتوحة',
 '+2 this month · 17 total':'+2 هذا الشهر · 17 إجماليًا',
 '2 need review · 2 sites':'2 تحتاج مراجعة · موقعان',
 '+5.4% vs. last month':'+5.4% مقارنة بالشهر الماضي',
 '6 high priority · 8 sites':'6 عالية الأولوية · 8 مواقع',
 'Current progress across active construction projects.':'نسبة الإنجاز الحالية عبر مشروعات الإنشاء النشطة.',
 'All active':'كل المشروعات النشطة',
 'At risk only':'المعرضة للخطر فقط',
 'Near completion':'قريبة من الإنجاز',
 'Milestones and site activities.':'المراحل والأنشطة الميدانية.',
 'Structural inspection':'فحص إنشائي',
 'Steel delivery':'توريد الحديد',
 'Finishing milestone':'مرحلة التشطيبات',
 'Client walkthrough':'جولة العميل',
 'Latest changes across the workspace.':'أحدث التغييرات داخل مساحة العمل.',
 'Daily site report submitted':'تم إرسال تقرير الموقع اليومي',
 'Invoice approved':'تم اعتماد الفاتورة',
 'New task assigned':'تم تعيين مهمة جديدة',
 'Document uploaded':'تم رفع مستند',
 'Santo workspace':'مساحة عمل سانتو',
 'Items that need a response.':'العناصر التي تحتاج إلى استجابة.',
 'Material mismatch':'عدم تطابق المواد',
 'Inspection reschedule':'إعادة جدولة الفحص',
 'Temporary access route':'مسار وصول مؤقت',
 'Assigned to project team':'تم تعيينها لفريق المشروع',
 'Portfolio-level view for this month.':'نظرة على مستوى محفظة المشروعات لهذا الشهر.',
 'Total budget':'إجمالي الميزانية',
 'Spent':'المصروف',
 'Committed':'الملتزم به',
 'Remaining':'المتبقي',
 'Materials':'المواد',
 'Labor':'العمالة',
 'progress':'الإنجاز',
 'Reports today':'تقارير اليوم',
 'Open site issues':'مشكلات المواقع المفتوحة',
 'Today\'s activity':'نشاط اليوم',
 'View all':'عرض الكل',
 'Recent field submissions.':'أحدث تقارير الميدان.',
 'Projects that move forward.':'مشروعات تمضي إلى الأمام.',
 'Plan, monitor, and manage every active and completed construction project from one connected workspace.':'خطط وتابع وأدر كل مشروع إنشاء نشط أو مكتمل من مساحة عمل واحدة مترابطة.',
 'Project register':'سجل المشروعات',
 'Search and filter the company portfolio.':'ابحث وفلتر محفظة مشروعات الشركة.',
 'Search projects...':'ابحث عن المشروعات...',
 'All status':'كل الحالات',
 'On Track':'على المسار',
 'At Risk':'معرض للخطر',
 'New':'جديد',
 'Export':'تصدير',
 'Stay close to the site.':'ابق قريبًا من الموقع.',
 'Keep site activity, daily reports, workers, observations, and issues visible across every construction location.':'حافظ على وضوح نشاط المواقع والتقارير اليومية والعمال والملاحظات والمشكلات في كل موقع إنشاء.',
 'Active sites':'المواقع النشطة',
 'Workers on site':'العمال في الموقع',
 'Daily site reports':'تقارير الموقع اليومية',
 'Concrete work completed — Downtown Residence':'اكتملت أعمال الخرسانة — Downtown Residence',
 'Steel delivery received — West Gate':'تم استلام توريد الحديد — West Gate',
 'Inspection scheduled — North District':'تمت جدولة الفحص — North District',
 'Safety observation filed — Al Noor Villa':'تم تسجيل ملاحظة سلامة — Al Noor Villa',
 'Submitted by':'مقدم الطلب',
 'Turn plans into action.':'حوّل الخطط إلى تنفيذ.',
 'Assign work, set priorities, manage due dates, and keep every team aligned.':'وزّع العمل وحدد الأولويات وأدر المواعيد وحافظ على تنسيق الفريق.',
 'Open tasks':'المهام المفتوحة',
 'This week':'هذا الأسبوع',
 'Milestones':'المراحل',
 'Inspections':'الفحوصات',
 'Deliveries':'التوريدات',
 'Know what happens next.':'اعرف ما يحدث بعد ذلك.',
 'Coordinate milestones, inspections, deliveries, deadlines, and project phases.':'نسّق المراحل والفحوصات والتوريدات والمواعيد ومراحل المشروع.',
 'Event':'الحدث',
 'Delivery':'توريد',
 'See where the work stands.':'اعرف أين يقف العمل.',
 'Manage job costs, invoices, expenses, budgets, cash, and financial commitments across projects.':'أدر تكاليف المشروعات والفواتير والمصروفات والميزانيات والسيولة والالتزامات المالية عبر المشروعات.',
 'Revenue':'الإيرادات',
 'Expenses':'المصروفات',
 'Receivables':'المستحقات',
 'Net position':'صافي الوضع المالي',
 'Build a stronger workforce.':'ابنِ قوة عاملة أقوى.',
 'Manage employees, attendance, leave, payroll workflows, recruitment, performance, and training.':'أدر الموظفين والحضور والإجازات ومسارات الرواتب والتوظيف والأداء والتدريب.',
 'Employees':'الموظفون',
 'Present today':'الحاضرون اليوم',
 'On leave':'في إجازة',
 'Open roles':'الوظائف المفتوحة',
 'Search':'بحث',
 'Keep every site supplied.':'حافظ على تزويد كل موقع.',
 'Track inventory, stock movements, material requests, receiving, suppliers, and site readiness.':'تابع المخزون وحركاته وطلبات المواد والاستلام والموردين وجاهزية المواقع.',
 'Inventory value':'قيمة المخزون',
 'Low stock':'مخزون منخفض',
 'Pending deliveries':'التوريدات المعلقة',
 'Requests':'الطلبات',
 'Buy with clarity.':'اشترِ بوضوح.',
 'Run requests, approvals, RFQs, quote comparisons, purchase orders, and receiving workflows.':'أدر الطلبات والموافقات وطلبات عروض الأسعار ومقارنة العروض وأوامر الشراء ومسارات الاستلام.',
 'Open RFQs':'طلبات عروض الأسعار المفتوحة',
 'Open POs':'أوامر الشراء المفتوحة',
 'Monthly value':'القيمة الشهرية',
 'Purchase Order':'أمر شراء',
 'Request':'طلب',
 'Relationships that deliver.':'علاقات تُنجز.',
 'Manage supplier records, orders, performance, compliance, and project coverage.':'أدر بيانات الموردين والطلبات والأداء والامتثال وتغطية المشروعات.',
 'Active suppliers':'الموردون النشطون',
 'Open orders':'الطلبات المفتوحة',
 'Average rating':'متوسط التقييم',
 'Keep assets ready.':'حافظ على جاهزية الأصول.',
 'Track heavy equipment, assignments, utilization, inspections, maintenance, and work orders.':'تابع المعدات الثقيلة والتعيينات والاستخدام والفحوصات والصيانة وأوامر العمل.',
 'Total equipment':'إجمالي المعدات',
 'Build safely. Build right.':'ابنِ بأمان. ابنِ بشكل صحيح.',
 'Manage incidents, inspections, checklists, permits, toolbox talks, PPE, and corrective actions.':'أدر الحوادث والفحوصات وقوائم التحقق والتصاريح واجتماعات التوعية ومعدات الوقاية والإجراءات التصحيحية.',
 'Open incidents':'الحوادث المفتوحة',
 'Inspections due':'الفحوصات المستحقة',
 'Corrective actions':'الإجراءات التصحيحية',
 'Compliance':'الامتثال',
 'Item':'العنصر',
 'Every file, in place.':'كل ملف في مكانه.',
 'Centralize plans, contracts, reports, permits, photos, versions, approvals, and access.':'اجمع الخطط والعقود والتقارير والتصاريح والصور والإصدارات والموافقات وحقوق الوصول في مكان واحد.',
 'Documents':'المستندات',
 'Awaiting review':'في انتظار المراجعة',
 'Versions this week':'الإصدارات هذا الأسبوع',
 'Shared':'مشترك',
 'Control every commitment.':'تحكم في كل التزام.',
 'Manage client and subcontractor contracts, values, retention, terms, approvals, and change orders.':'أدر عقود العملاء والمقاولين من الباطن والقيم والاحتجاز والشروط والموافقات وأوامر التغيير.',
 'Active contracts':'العقود النشطة',
 'Change orders':'أوامر التغيير',
 'Retention':'الاحتجاز',
 'See the operation clearly.':'ارَ العملية بوضوح.',
 'Executive and operational reports across projects, costs, procurement, workforce, equipment, and safety.':'تقارير تنفيذية وتشغيلية عبر المشروعات والتكاليف والمشتريات والموارد البشرية والمعدات والسلامة.',
 'Saved reports':'التقارير المحفوظة',
 'Exports this month':'التصديرات هذا الشهر',
 'Data sources':'مصادر البيانات',
 'Last run':'آخر تشغيل',
 'Win better work before it starts.':'افز بأعمال أفضل قبل أن تبدأ.',
 'Build estimates, manage opportunities, compare bids, and convert awarded work into projects.':'أنشئ التقديرات وأدر الفرص وقارن العطاءات وحوّل الأعمال الفائزة إلى مشروعات.',
 'Open opportunities':'الفرص المفتوحة',
 'Active estimates':'التقديرات النشطة',
 'Bids due':'العطاءات المستحقة',
 'Win rate':'معدل الفوز',
 'Opportunity':'الفرصة',
 'Stage':'المرحلة',
 'Estimating':'التقدير',
 'Bid review':'مراجعة العطاء',
 'Proposal':'عرض',
 'Qualification':'تأهيل',
 'Know every quantity and cost code.':'اعرف كل كمية وكل كود تكلفة.',
 'Organize WBS, BOQ items, cost codes, budget allocations, committed cost, and actual cost.':'نظّم هيكل تقسيم العمل وبنود جدول الكميات وأكواد التكلفة وتخصيصات الميزانية والتكاليف الملتزم بها والفعلية.',
 'Cost codes':'أكواد التكلفة',
 'BOQ items':'بنود جدول الكميات',
 'Budgeted':'المُدرج بالميزانية',
 'Code':'الكود',
 'Questions deserve answers.':'الأسئلة تستحق إجابات.',
 'Track requests for information, ownership, design clarification, impact, and response history.':'تابع طلبات المعلومات والملكية وتوضيحات التصميم والأثر وسجل الردود.',
 'Open RFIs':'طلبات المعلومات المفتوحة',
 'Subject':'الموضوع',
 'Review before you build.':'راجع قبل أن تبني.',
 'Route shop drawings, material submittals, samples, and technical packages through approval workflows.':'مرّر الرسومات التنفيذية واعتمادات المواد والعينات والحزم الفنية عبر مسارات الاعتماد.',
 'Open submittals':'طلبات الاعتماد المفتوحة',
 'Quality is a workflow.':'الجودة مسار عمل.',
 'Manage inspections, defects, punch lists, checklists, and corrective actions across sites.':'أدر الفحوصات والعيوب وقوائم الملاحظات وقوائم التحقق والإجراءات التصحيحية عبر المواقع.',
 'Open defects':'العيوب المفتوحة',
 'Punch items':'بنود الملاحظات',
 'Pass rate':'نسبة الاجتياز',
 'Inspector':'الفاحص',
 'Coordinate the teams behind the build.':'نسّق الفرق التي تقف وراء التنفيذ.',
 'Manage work packages, scopes, compliance, payment applications, retention, and performance.':'أدر حزم الأعمال والنطاقات والامتثال وطلبات الدفعات والاحتجاز والأداء.',
 'Active subs':'المقاولون النشطون',
 'Work packages':'حزم الأعمال',
 'Pending apps':'الطلبات المعلقة',
 'Subcontractor':'المقاول من الباطن',
 'Leave every meeting with clarity.':'اخرج من كل اجتماع بوضوح.',
 'Plan meetings, capture minutes, assign actions, and keep decisions attached to the project record.':'خطط للاجتماعات وسجل المحاضر ووزّع الإجراءات واربط القرارات بسجل المشروع.',
 'Open actions':'الإجراءات المفتوحة',
 'Minutes pending':'المحاضر المعلقة',
 'Decisions logged':'القرارات المسجلة',
 'Build from the right version.':'ابنِ من الإصدار الصحيح.',
 'Manage drawing sets, revisions, sheets, issue dates, distribution, and approvals.':'أدر مجموعات الرسومات والمراجعات واللوحات وتواريخ الإصدار والتوزيع والموافقات.',
 'Drawing sets':'مجموعات الرسومات',
 'Current sheets':'اللوحات الحالية',
 'Pending revision':'المراجعات المعلقة',
 'Archived':'مؤرشف',
 'Discipline':'التخصص',
 'Revision':'المراجعة',
 'Issued':'صادر',
 'Finish well. Hand over cleanly.':'أنهِ العمل جيدًا. وسلّمه بشكل منظم.',
 'Track punch lists, as-builts, warranties, O&M manuals, approvals, and final handover.':'تابع قوائم الملاحظات ورسومات التنفيذ الفعلي والضمانات وكتيبات التشغيل والصيانة والموافقات والتسليم النهائي.',
 'Projects closing':'المشروعات التي تقترب من الإغلاق',
 'Punch list':'قائمة الملاحظات',
 'As-builts':'رسومات التنفيذ الفعلي',
 'Warranties':'الضمانات',
 'Handover readiness':'جاهزية التسليم',
 'Make Santo fit your company.':'اجعل سانتو مناسبًا لشركتك.',
 'Manage company settings, workspace preferences, integrations, security, notifications, and user access.':'أدر إعدادات الشركة وتفضيلات مساحة العمل والتكاملات والأمان والإشعارات ووصول المستخدمين.',
 'Users':'المستخدمون',
 'Roles':'الأدوار',
 'Integrations':'التكاملات',
 'Security checks':'فحوصات الأمان',
 'Setting area':'منطقة الإعداد',
 'Search projects, people, documents...':'ابحث عن المشروعات والأشخاص والمستندات...',
 'New Task':'مهمة جديدة',
 'New Project':'مشروع جديد',
 'Daily Site Report':'تقرير موقع يومي',
 'Purchase Request':'طلب شراء',
 'Expense':'مصروف',
 'Upload Document':'رفع مستند',
 'Add Employee':'إضافة موظف',
 'New Schedule Item':'عنصر جديد في الجدول',
 'New Transaction':'معاملة جديدة',
 'New Employee':'موظف جديد',
 'New Material':'مادة جديدة',
 'New Purchase Request':'طلب شراء جديد',
 'New Supplier':'مورد جديد',
 'New Equipment':'معدات جديدة',
 'New Safety Incident':'حادث سلامة جديد',
 'New Contract':'عقد جديد',
 'New Report':'تقرير جديد',
 'New Estimate':'تقدير جديد',
 'New BOQ Item':'بند جدول كميات جديد',
 'New RFI':'طلب معلومات جديد',
 'New Submittal':'طلب اعتماد جديد',
 'New Inspection':'فحص جديد',
 'New Subcontractor':'مقاول من الباطن جديد',
 'New Meeting':'اجتماع جديد',
 'New Drawing':'رسم جديد',
 'New Closeout Item':'بند إغلاق جديد',
 'Workspace Settings':'إعدادات مساحة العمل',
 'Export Projects':'تصدير المشروعات',
 'New Site Issue':'مشكلة موقع جديدة',
 'min ago':'منذ دقائق',
 'hr ago':'منذ ساعة',
 'hours ago':'منذ ساعات',
 'ago':'مضت',
 'Today':'اليوم',
 'Yesterday':'أمس',
 'Oct':'أكتوبر',
 'PDF':'PDF',
 'XLSX':'XLSX',
 'Structural':'إنشائي',
 'Architectural':'معماري',
 'Mechanical':'ميكانيكي',
 'Electrical':'كهربائي',
 'Finance':'المالية',
 'HR':'الموارد البشرية',
 'Admin':'مسؤول النظام',
 'Consultant':'استشاري',
 'Architect':'معماري',
 'Safety Officer':'مسؤول السلامة',
 'Site Supervisor':'مشرف الموقع',
 'Safety Team':'فريق السلامة',
 'Project Manager':'مدير مشروعات',
};

function translateUiText(text:string,lang:'en'|'ar'){if(lang==='en')return text;const exact=UI_AR[text];if(exact)return exact;let out=text;const replacements=Object.entries(UI_AR).filter(([k])=>k.length>2).sort((a,b)=>b[0].length-a[0].length);for(const [from,to] of replacements){if(out.includes(from))out=out.split(from).join(to);}return out;}

function LocalizeUI({children,lang}:{children:ReactNode;lang:'en'|'ar'}){
 const walk=(node:ReactNode):ReactNode=>{
  if(typeof node==='string')return translateUiText(node,lang);
  if(Array.isArray(node))return node.map((child)=>walk(child));
  if(isValidElement(node)){
   const element=node as ReactElement<{children?:ReactNode}>;
   if(element.props.children===undefined)return element;
   return cloneElement(element,{children:walk(element.props.children)});
  }
  return node;
 };
 return <>{walk(children)}</>;
}


type SearchRecord={id:string;title:string;meta:string;type:string;href:string};

const globalSearchRecords:SearchRecord[]=[
 ...projects.map((x:any)=>({id:`project-${x.id}`,title:x.name,meta:`${x.location} · ${x.manager}`,type:'Project',href:'/app/projects'})),
 ...tasks.map((x:any,i:number)=>({id:`task-${i}`,title:x.title,meta:`${x.project} · ${x.assignee}`,type:'Task',href:'/app/tasks'})),
 ...employees.map((x:any,i:number)=>({id:`employee-${i}`,title:x.name,meta:`${x.role} · ${x.department}`,type:'Employee',href:'/app/hr'})),
 ...materials.map((x:any,i:number)=>({id:`material-${i}`,title:x.name,meta:`${x.category} · ${x.project}`,type:'Material',href:'/app/materials'})),
 ...suppliers.map((x:any,i:number)=>({id:`supplier-${i}`,title:x.name,meta:`${x.category} · ${x.status}`,type:'Supplier',href:'/app/suppliers'})),
 ...equipment.map((x:any,i:number)=>({id:`equipment-${i}`,title:x.name,meta:`${x.type} · ${x.site}`,type:'Equipment',href:'/app/equipment'})),
 ...invoices.map((x:any)=>({id:`invoice-${x.no}`,title:x.no,meta:`${x.project} · ${x.amount}`,type:'Invoice',href:'/app/accounting'})),
 ...documents.map((x:any,i:number)=>({id:`document-${i}`,title:x.name,meta:`${x.type} · ${x.project}`,type:'Document',href:'/app/documents'})),
];

type StatusType='ok'|'warn'|'bad'|'neutral';

function getStatusType(text:string):StatusType{
 const value=text.toLowerCase();
 if(/overdue|delay|risk|rejected|action needed|over budget|high|revise/.test(value))return 'bad';
 if(/review|pending|watch|in progress|await|due|scheduled|quote review/.test(value))return 'warn';
 if(/active|ready|passed|approved|on track|current|configured|completed|filed|ordered|delivered/.test(value))return 'ok';
 return 'neutral';
}

export default function SantoApp(){
 const {lang,setLang,t}=useLanguage(); const router=useRouter(); const path=usePathname(); const [collapsed,setCollapsed]=useState(false); const [mobile,setMobile]=useState(false); const [quick,setQuick]=useState(false); const [quickContext,setQuickContext]=useState(''); const [notice,setNotice]=useState(false); const [query,setQuery]=useState('');
 useEffect(()=>{if(!localStorage.getItem('santo-demo-auth'))router.replace('/login')},[router]);
 const current=useMemo(()=>path==='/app'?'overview':path.split('/')[2]||'overview',[path]);
 const groups=useMemo(()=>Array.from(new Set(nav.map(x=>x.group))),[]);
 const activeLabel=t(labelKeys[current]??'overview');
 const searchResults=useMemo(()=>{
   const term=query.trim().toLowerCase();
   if(term.length<2)return [];
   return globalSearchRecords.filter((item)=>`${item.title} ${item.meta} ${item.type}`.toLowerCase().includes(term)).slice(0,8);
 },[query]);
 const submitSearch=()=>{
   const first=searchResults[0];
   if(!first)return;
   setQuery('');
   router.push(first.href);
 };
 const signOut=()=>{localStorage.removeItem('santo-demo-auth');router.push('/login')};
 const openQuick=(label='')=>{setQuickContext(label);setQuick(true);}; const runQuick=(label:string)=>{setQuick(false);setQuickContext('');setNotice(true);setTimeout(()=>setNotice(false),1900);};
 return <LocalizeUI lang={lang}><div className="min-h-screen bg-[var(--parchment)] text-[var(--ink)]">
   <aside className={`fixed inset-y-0 left-0 z-40 flex w-[278px] flex-col border-r border-[var(--taupe)] bg-[#fbf5e9] transition-all duration-200 rtl:left-auto rtl:right-0 rtl:border-l rtl:border-r-0 ${collapsed?'-translate-x-full lg:translate-x-0 lg:w-[90px]':'translate-x-0'} ${mobile?'translate-x-0':''}`}>
    <div className="flex h-[78px] items-center justify-between border-b border-[var(--taupe)] px-5">
      <Link href="/app" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-[13px] bg-[var(--terracotta)] font-bold text-white">S</span>{!collapsed&&<span className="serif text-3xl">Santo</span>}</Link>
      <button onClick={()=>setCollapsed(!collapsed)} className="hidden rounded-full p-2 text-[var(--graphite)] hover:bg-[var(--aged)] lg:block" aria-label="Collapse sidebar">{collapsed?<PanelLeftOpen size={18}/>:<PanelLeftClose size={18}/>}</button>
      <button onClick={()=>setMobile(false)} className="rounded-full p-2 hover:bg-[var(--aged)] lg:hidden"><X size={19}/></button>
    </div>
    {!collapsed&&<div className="mx-4 mt-4 rounded-2xl border border-[var(--taupe)] bg-[var(--parchment)] px-4 py-3"><div className="text-[10px] uppercase tracking-[.11em] text-[var(--graphite)]">WORKSPACE</div><div className="mt-1 flex items-center justify-between text-sm font-semibold"><span>Al Noor Contracting</span><span>⌄</span></div></div>}
    <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
      {groups.map(g=><div key={g} className="mb-5"><div className={`px-3 pb-2 text-[10px] uppercase tracking-[.12em] text-[var(--graphite)] ${collapsed?'hidden':''}`}>{g}</div>{nav.filter(n=>n.group===g).map(item=>{const Icon=item.icon;const active=current===item.key;return <Link key={item.href} href={item.href} title={collapsed?t(item.key):undefined} onClick={()=>setMobile(false)} className={`mb-1 flex items-center gap-3 rounded-[13px] px-3 py-2.5 text-sm transition ${active?'bg-[#ead7cc] font-bold text-[var(--terracotta)]':'text-[var(--charcoal)] hover:bg-[var(--aged)]'} ${collapsed?'justify-center':''}`}><Icon size={18}/>{!collapsed&&<span>{t(item.key)}</span>}</Link>})}</div>)}
    </nav>
    <div className="border-t border-[var(--taupe)] p-3">
      {!collapsed&&<div className="mb-3 rounded-[18px] bg-[var(--aged)] p-4"><div className="eyebrow text-[var(--terracotta)]">NEED HELP?</div><p className="mt-2 text-xs leading-5 text-[var(--graphite)]">Review workspace guidance, approvals, and help resources.</p><button onClick={()=>runQuick('Support')} className="pill mt-2 w-full border border-[var(--taupe)] bg-[var(--parchment)] px-3 py-2 text-xs font-semibold">Open support</button></div>}
      <button onClick={signOut} className={`flex w-full items-center gap-3 rounded-[13px] px-3 py-2.5 text-sm text-[var(--charcoal)] hover:bg-[var(--aged)] ${collapsed?'justify-center':''}`}><LogOut size={18}/>{!collapsed&&<span>{t('logout')}</span>}</button>
    </div>
   </aside>
   <div className={`transition-all ${collapsed?'lg:pl-[90px] rtl:lg:pr-[90px] rtl:lg:pl-0':'lg:pl-[278px] rtl:lg:pr-[278px] rtl:lg:pl-0'}`}>
     <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between gap-4 border-b border-[var(--taupe)] bg-[rgba(254,249,239,.95)] px-4 backdrop-blur sm:px-7">
       <div className="flex min-w-0 items-center gap-3"><button onClick={()=>setMobile(true)} className="grid size-10 place-items-center rounded-full border border-[var(--taupe)] bg-[var(--parchment)] lg:hidden"><Menu size={19}/></button><div className="hidden text-xs text-[var(--graphite)] sm:block">Santo / <span className="font-semibold text-[var(--ink)]">{activeLabel}</span></div></div>
       <div className="relative hidden w-full max-w-[430px] md:block"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--graphite)] rtl:left-auto rtl:right-3.5"/><input value={query} onChange={(e:any)=>setQuery(e.target.value)} onKeyDown={(e:any)=>{if(e.key==='Enter')submitSearch();if(e.key==='Escape')setQuery('')}} className="focus-ring w-full rounded-full border border-[var(--ash)] bg-[var(--parchment)] py-3 pl-10 pr-4 text-sm outline-none rtl:pl-4 rtl:pr-10" placeholder={t('search')} aria-label={t('search')}/>{query.trim().length>=2&&<div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-[22px] border border-[var(--taupe)] bg-[var(--parchment)] p-2 shadow-[var(--shadow-xl)]">{searchResults.length>0?searchResults.map(result=><button key={result.id} type="button" onClick={()=>{setQuery('');router.push(result.href)}} className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left hover:bg-[var(--aged)] rtl:text-right"><span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--aged)] text-[var(--terracotta)]"><Search size={14}/></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{result.title}</span><span className="mt-1 block truncate text-xs text-[var(--graphite)]">{result.meta}</span></span><span className="rounded-full bg-[var(--aged)] px-2 py-1 text-[10px] font-semibold text-[var(--graphite)]">{result.type}</span></button>):<div className="px-3 py-4 text-sm text-[var(--graphite)]">No results found.</div>}</div>}</div>
       <div className="flex items-center gap-2"><button onClick={()=>setLang(lang==='en'?'ar':'en')} className="pill border border-[var(--taupe)] px-3 py-2 text-xs">{lang==='en'?'العربية':'English'}</button><button onClick={()=>setNotice(true)} className="relative grid size-10 place-items-center rounded-full hover:bg-[var(--aged)]"><Bell size={18}/><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[var(--terracotta)]"/></button><button onClick={()=>openQuick()} className="grid size-10 place-items-center rounded-full bg-[var(--terracotta)] text-white"><Plus size={19}/></button><button onClick={()=>runQuick('Profile')} className="grid size-10 place-items-center rounded-full bg-[#dfc4b6] text-xs font-bold">AM</button></div>
     </header>
     <main className="mx-auto max-w-[1540px] px-4 py-8 sm:px-7 lg:px-9"><Screen current={current} setNotice={()=>setNotice(true)} runQuick={runQuick} openQuick={openQuick} lang={lang}/></main>
   </div>
   {mobile&&<button aria-label="Close navigation" onClick={()=>setMobile(false)} className="fixed inset-0 z-30 bg-black/20 lg:hidden"/>}
   {quick&&<div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" onMouseDown={()=>{setQuick(false);setQuickContext('')}}><div onMouseDown={(e:any)=>e.stopPropagation()} className="w-full max-w-xl rounded-[26px] border border-[var(--taupe)] bg-[var(--parchment)] p-6 shadow-[var(--shadow-xl)]"><div className="flex items-start justify-between"><div><div className="eyebrow text-[var(--terracotta)]">{t('quickCreate')}</div><h2 className="serif mt-2 text-3xl">Create something new.</h2></div><button onClick={()=>{setQuick(false);setQuickContext('')}} className="rounded-full p-2 hover:bg-[var(--aged)]"><X size={18}/></button></div><div className="mt-5 grid grid-cols-2 gap-3">{quickContext&&<button type="button" onClick={()=>runQuick(quickContext)} className="col-span-2 rounded-2xl border border-[var(--terracotta)] bg-[var(--terracotta)] p-4 text-left text-sm font-semibold text-[var(--parchment)]"><Plus className="mb-3 size-4"/>{quickContext}</button>}{['New Project','New Task','Daily Site Report','Purchase Request','Expense','Invoice','Upload Document','Add Employee'].map(x=><button key={x} onClick={()=>runQuick(x)} className="rounded-2xl border border-[var(--taupe)] bg-[var(--aged)] p-4 text-left text-sm font-semibold hover:border-[var(--terracotta)]"><Plus className="mb-3 size-4 text-[var(--terracotta)]"/>{x}</button>)}</div></div></div>}
   {notice&&<div className="fixed bottom-5 right-5 z-[60] rounded-2xl bg-[var(--ink)] px-4 py-3 text-sm text-[var(--parchment)] shadow-lg">Action completed for demo.</div>}
 </div></LocalizeUI>
}

function PageHeader({eyebrow,title,desc,actions}:{eyebrow:string;title:ReactNode;desc:string;actions?:ReactNode}){const {lang}=useLanguage();return <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="eyebrow text-[var(--terracotta)]">{translateUiText(eyebrow,lang)}</div><h1 className="serif mt-2 text-5xl leading-[.98] sm:text-6xl"><LocalizeUI lang={lang}>{title}</LocalizeUI></h1><p className="mt-3 max-w-2xl text-[15px] leading-6 text-[var(--graphite)]">{translateUiText(desc,lang)}</p></div>{actions&&<div className="flex flex-wrap gap-2">{actions}</div>}</div>}
function Button({children,primary=false,onClick}:{children:ReactNode;primary?:boolean;onClick?:()=>void}){const {lang}=useLanguage();return <button onClick={onClick} className={`pill px-4 py-2.5 text-sm font-bold ${primary?'bg-[var(--terracotta)] text-[var(--parchment)]':'border border-[var(--terracotta)] bg-transparent text-[var(--terracotta)]'}`}>{typeof children==='string'?translateUiText(children,lang):<LocalizeUI lang={lang}>{children}</LocalizeUI>}</button>}
function StatCard({label,value,change,icon}:{label:string;value:string;change?:string;icon:ReactNode}){const {lang}=useLanguage();return <div className="card p-5"><div className="flex items-center justify-between"><span className="text-xs text-[var(--graphite)]">{translateUiText(label,lang)}</span><span className="text-[var(--terracotta)]">{icon}</span></div><div className="serif mt-4 text-4xl">{value}</div>{change&&<div className="mt-2 text-xs text-[var(--graphite)]">{translateUiText(change,lang)}</div>}</div>}
function Table({headers,rows}:{headers:string[];rows:ReactNode[][]}){const {lang}=useLanguage();return <div className="overflow-x-auto rounded-[22px] border border-[var(--taupe)] bg-[var(--parchment)]"><table className="min-w-full text-left text-sm rtl:text-right"><thead><tr className="border-b border-[var(--taupe)] text-xs text-[var(--graphite)]">{headers.map(h=><th key={h} className="px-4 py-3 font-semibold">{translateUiText(h,lang)}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} className="border-b border-[var(--taupe)]/70 last:border-0 hover:bg-[var(--aged)]/70">{row.map((c,j)=><td key={j} className="px-4 py-4 align-middle">{typeof c==='string'?translateUiText(c,lang):<LocalizeUI lang={lang}>{c}</LocalizeUI>}</td>)}</tr>)}</tbody></table></div>}
function Status({text,type='ok'}:{text:string;type?:'ok'|'warn'|'bad'|'neutral'}){const {lang}=useLanguage();const cls=type==='ok'?'text-[var(--green)] bg-[#e3ece5]':type==='warn'?'text-[var(--amber)] bg-[#f2e8d7]':type==='bad'?'text-[var(--red)] bg-[#eee0dc]':'text-[var(--graphite)] bg-[#e7e2da]';return <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${cls}`}>{translateUiText(text,lang)}</span>}
function Dashboard({runQuick}:{runQuick:(x:string)=>void}){return <><PageHeader eyebrow="CONSTRUCTION OPERATIONS" title={<>Good morning, Ahmed.<br/>Here is what needs your <em>attention.</em></>} desc="A clear view of projects, field activity, deadlines, and financial performance across your workspace." actions={<><Button primary onClick={()=>runQuick('New project')}>New project</Button><Button onClick={()=>runQuick('Daily report')}>Daily site report</Button><Button onClick={()=>runQuick('Filters')}>Filters</Button></>}/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active projects" value="12" change="+2 this month · 17 total" icon={<FolderKanban size={18}/>}/><StatCard label="Projects at risk" value="3" change="2 need review · 2 sites" icon={<AlertTriangle size={18}/>}/><StatCard label="Average progress" value="68%" change="+5.4% vs. last month" icon={<ArrowUpRight size={18}/>}/><StatCard label="Open issues" value="24" change="6 high priority · 8 sites" icon={<ClipboardCheck size={18}/>}/></div><div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_.9fr]"><div className="card p-5"><div className="mb-4 flex items-start justify-between"><div><h2 className="serif text-2xl">Project performance</h2><p className="mt-1 text-xs text-[var(--graphite)]">Current progress across active construction projects.</p></div><select className="pill border border-[var(--taupe)] bg-[var(--parchment)] px-3 py-2 text-xs"><option>All active</option><option>At risk only</option><option>Near completion</option></select></div><div className="space-y-4">{projects.slice(0,4).map(p=><div key={p.id} className="grid gap-3 border-t border-[var(--taupe)] pt-4 md:grid-cols-[1.15fr_.6fr_1.35fr_.35fr] md:items-center first:border-t-0 first:pt-0"><div><div className="text-sm font-semibold">{p.name}</div><div className="mt-1 text-xs text-[var(--graphite)]">{p.location} · {p.manager}</div></div><Status text={p.status} type={p.status==='At Risk'?'warn':p.status==='Delayed'?'bad':p.status==='Near Completion'?'neutral':'ok'}/><div className="flex items-center gap-3"><div className="h-2 flex-1 rounded-full bg-[#e3d9cc]"><div className="h-2 rounded-full bg-[var(--terracotta)]" style={{width:`${p.progress}%`}}/></div><span className="w-9 text-right text-xs text-[var(--graphite)]">{p.progress}%</span></div><span className="text-xs text-[var(--graphite)]">{p.id}</span></div>)}</div></div><div className="card p-5"><div className="mb-4"><h2 className="serif text-2xl">Upcoming</h2><p className="mt-1 text-xs text-[var(--graphite)]">Milestones and site activities.</p></div><div className="space-y-3">{[['08','Oct','Structural inspection','West Gate Business Center','09:30'],['09','Oct','Steel delivery','North District Apartments','11:00'],['10','Oct','Finishing milestone','Al Noor Villa','14:00'],['12','Oct','Client walkthrough','Downtown Residence','16:30']].map(x=><div key={x[0]} className="flex items-center gap-3 border-t border-[var(--taupe)] pt-3 first:border-t-0 first:pt-0"><div className="w-11 text-center"><div className="serif text-2xl">{x[0]}</div><div className="text-[9px] uppercase tracking-[.08em] text-[var(--graphite)]">{x[1]}</div></div><div className="min-w-0 flex-1"><div className="text-xs font-semibold">{x[2]}</div><div className="mt-1 text-[10px] text-[var(--graphite)]">{x[3]}</div></div><div className="text-[10px] font-bold text-[var(--terracotta)]">{x[4]}</div></div>)}</div></div></div><div className="mt-4 grid gap-4 lg:grid-cols-3"><section className="card p-5"><h2 className="serif text-2xl">Recent activity</h2><p className="mt-1 text-xs text-[var(--graphite)]">Latest changes across the workspace.</p><div className="mt-5 space-y-3">{['Daily site report submitted','Invoice approved','New task assigned','Document uploaded'].map((x,i)=><div key={x} className="flex gap-3 border-t border-[var(--taupe)] pt-3 first:border-t-0 first:pt-0"><div className="grid size-8 place-items-center rounded-xl bg-[var(--parchment)] text-[var(--terracotta)]">{i===0?<ClipboardCheck size={14}/>:i===1?<Coins size={14}/>:i===2?<ClipboardList size={14}/>:<FileArchive size={14}/>}</div><div><div className="text-xs font-semibold">{x}</div><div className="mt-1 text-[10px] text-[var(--graphite)]">{i*25+18} min ago · Santo workspace</div></div></div>)}</div></section><section className="card p-5"><h2 className="serif text-2xl">Site issues</h2><p className="mt-1 text-xs text-[var(--graphite)]">Items that need a response.</p><div className="mt-5 space-y-3">{[['Material mismatch','North District Apartments','High','bad'],['Inspection reschedule','West Gate Business Center','Medium','warn'],['Temporary access route','Downtown Residence','Low','ok']].map(x=><div key={x[0]} className="rounded-2xl border border-[var(--taupe)] bg-[var(--parchment)] p-3"><div className="flex items-center justify-between"><div className="text-xs font-semibold">{x[0]}</div><Status text={x[2]} type={x[3] as 'bad'|'warn'|'ok'}/></div><div className="mt-1 text-[10px] text-[var(--graphite)]">{x[1]}</div><div className="mt-2 flex justify-between text-[9px] text-[var(--graphite)]"><span>Assigned to project team</span><span>2h</span></div></div>)}</div></section><section className="card p-5"><h2 className="serif text-2xl">Financial snapshot</h2><p className="mt-1 text-xs text-[var(--graphite)]">Portfolio-level view for this month.</p><div className="mt-5 space-y-3">{[['Total budget','$4.80M'],['Spent','$3.24M'],['Committed','$0.92M'],['Remaining','$0.64M']].map(x=><div key={x[0]} className="flex items-end justify-between border-b border-[var(--taupe)] pb-3 last:border-b-0"><span className="text-xs text-[var(--graphite)]">{x[0]}</span><span className="serif text-2xl">{x[1]}</span></div>)}<div className="pt-1">{[['Materials',74],['Labor',61],['Equipment',44]].map(x=><div key={x[0]} className="mb-3 grid grid-cols-[75px_1fr_35px] items-center gap-2"><span className="text-[10px] text-[var(--graphite)]">{x[0]}</span><div className="h-2 rounded-full bg-[#e3d9cc]"><div className="h-2 rounded-full bg-[var(--terracotta)]" style={{width:`${x[1]}%`}}/></div><span className="text-right text-[9px] text-[var(--graphite)]">{x[1]}%</span></div>)}</div></div></section></div></>}

function Projects({openQuick,lang}:{openQuick:(label?:string)=>void;lang:'en'|'ar'}){return <><PageHeader eyebrow="PROJECT PORTFOLIO" title={<>Projects that move <em>forward.</em></>} desc="Plan, monitor, and manage every active and completed construction project from one connected workspace." actions={<><Button primary onClick={()=>openQuick('New Project')}>New project</Button><Button onClick={()=>openQuick('Export Projects')}>Export</Button></>}/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active" value="12" icon={<FolderKanban size={18}/>}/><StatCard label="On track" value="8" icon={<CheckCircle2 size={18}/>}/><StatCard label="At risk" value="3" icon={<AlertTriangle size={18}/>}/><StatCard label="Completed" value="5" icon={<ClipboardCheck size={18}/>}/></div><div className="card mt-4 p-5"><div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h2 className="serif text-2xl">Project register</h2><p className="mt-1 text-xs text-[var(--graphite)]">Search and filter the company portfolio.</p></div><div className="flex gap-2"><input className="pill border border-[var(--ash)] bg-[var(--parchment)] px-4 py-2 text-sm" placeholder={translateUiText("Search projects...",lang)}/><select className="pill border border-[var(--taupe)] bg-[var(--parchment)] px-3 py-2 text-xs"><option>All status</option><option>On Track</option><option>At Risk</option><option>Delayed</option></select></div></div><Table headers={['Project','Client','Location','Manager','Progress','Budget','Deadline','Status']} rows={projects.map(p=>[<div><div className="font-semibold">{p.name}</div><div className="mt-1 text-[10px] text-[var(--graphite)]">{p.id}</div></div>,p.client,p.location,p.manager,<div className="min-w-[130px]"><div className="flex justify-between text-[10px]"><span>{p.progress}%</span><span>progress</span></div><div className="mt-1 h-2 rounded-full bg-[#e3d9cc]"><div className="h-2 rounded-full bg-[var(--terracotta)]" style={{width:`${p.progress}%`}}/></div></div>,p.budget,p.deadline,<Status text={p.status} type={p.status==='At Risk'?'warn':p.status==='Delayed'?'bad':p.status==='Near Completion'?'neutral':'ok'}/>])}/></div></>}

function Field({openQuick}:{openQuick:(label?:string)=>void}){return <><PageHeader eyebrow="FIELD OPERATIONS" title={<>Stay close to the <em>site.</em></>} desc="Keep site activity, daily reports, workers, observations, and issues visible across every construction location." actions={<><Button primary onClick={()=>openQuick('Daily Site Report')}>Daily site report</Button><Button onClick={()=>openQuick('New Site Issue')}>New issue</Button></>}/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active sites" value="8" icon={<HardHat size={18}/>}/><StatCard label="Workers on site" value="214" icon={<Users size={18}/>}/><StatCard label="Reports today" value="11" icon={<ClipboardCheck size={18}/>}/><StatCard label="Open site issues" value="24" icon={<AlertTriangle size={18}/>}/></div><div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><div className="card p-5"><h2 className="serif text-2xl">Active sites</h2><div className="mt-4 grid gap-3">{projects.slice(0,4).map(p=><div key={p.id} className="rounded-2xl border border-[var(--taupe)] bg-[var(--parchment)] p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-semibold">{p.name} Site</div><div className="mt-1 text-xs text-[var(--graphite)]">{p.location} · {p.manager}</div></div><Status text={p.status} type={p.status==='At Risk'?'warn':p.status==='Delayed'?'bad':'ok'}/></div><div className="mt-4 grid grid-cols-3 gap-3 text-center"><div><div className="text-lg font-semibold">{p.progress}%</div><div className="text-[10px] text-[var(--graphite)]">Progress</div></div><div><div className="text-lg font-semibold">{24+p.progress}</div><div className="text-[10px] text-[var(--graphite)]">Workers</div></div><div><div className="text-lg font-semibold">{p.progress>80?1:3}</div><div className="text-[10px] text-[var(--graphite)]">Issues</div></div></div></div>)}</div></div><div className="card p-5"><h2 className="serif text-2xl">Today's activity</h2><div className="mt-4 space-y-4">{['Concrete work completed — Downtown Residence','Steel delivery received — West Gate','Inspection scheduled — North District','Safety observation filed — Al Noor Villa'].map((x,i)=><div key={x} className="flex gap-3"><div className="grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--aged)] text-[var(--terracotta)]">{i===3?<ShieldCheck size={14}/>:<ClipboardCheck size={14}/>}</div><div><div className="text-xs font-semibold">{x}</div><div className="mt-1 text-[10px] text-[var(--graphite)]">{['18m','1h','2h','3h'][i]} ago</div></div></div>)}</div></div></div><div className="card mt-4 p-5"><div className="flex items-center justify-between"><div><h2 className="serif text-2xl">Daily site reports</h2><p className="mt-1 text-xs text-[var(--graphite)]">Recent field submissions.</p></div><Button>View all</Button></div><Table headers={['Date','Site','Project','Submitted by','Workers','Status']} rows={[['Oct 07, 2026','Downtown Site','Downtown Residence','Youssef Ali','42',<Status text="Filed"/>],['Oct 07, 2026','West Gate Site','West Gate Business Center','Mariam Samir','31',<Status text="Review" type="warn"/>],['Oct 06, 2026','Al Noor Site','Al Noor Villa','Ahmed Nabil','18',<Status text="Filed"/>]]}/></div></>}

function ModulePage({kind,openQuick}:{kind:string;openQuick:(label?:string)=>void}){const configs:Record<string,{eyebrow:string;title:ReactNode;desc:string;stats:[string,string][];headers:string[];rows:string[][]}>={
 tasks:{eyebrow:'WORK MANAGEMENT',title:<>Turn plans into <em>action.</em></>,desc:'Assign work, set priorities, manage due dates, and keep every team aligned.',stats:[['Open tasks','42'],['In progress','18'],['Review','7'],['Completed','126']],headers:['Task','Project','Assignee','Priority','Status','Due'],rows:tasks.map(x=>[x.title,x.project,x.assignee,x.priority,x.status,x.due])},
 schedule:{eyebrow:'PROJECT SCHEDULE',title:<>Know what happens <em>next.</em></>,desc:'Coordinate milestones, inspections, deliveries, deadlines, and project phases.',stats:[['This week','18'],['Milestones','7'],['Inspections','4'],['Deliveries','6']],headers:['Date','Event','Project','Owner','Type','Status'],rows:[['Oct 08','Structural inspection','West Gate Business Center','Mariam Samir','Inspection','Confirmed'],['Oct 09','Steel delivery','North District Apartments','Omar Khaled','Delivery','Scheduled'],['Oct 10','Finishing milestone','Al Noor Villa','Youssef Ali','Milestone','On track'],['Oct 12','Client walkthrough','Downtown Residence','Ahmed Mahmoud','Meeting','Planned']]},
 accounting:{eyebrow:'FINANCE',title:<>See where the work <em>stands.</em></>,desc:'Manage job costs, invoices, expenses, budgets, cash, and financial commitments across projects.',stats:[['Revenue','$6.2M'],['Expenses','$3.9M'],['Receivables','$680K'],['Net position','$2.3M']],headers:['Reference','Project','Type','Amount','Date','Status'],rows:invoices.map(x=>[x.no,x.project,'Invoice',x.amount,x.due,x.status])},
 hr:{eyebrow:'PEOPLE',title:<>Build a stronger <em>workforce.</em></>,desc:'Manage employees, attendance, leave, payroll workflows, recruitment, performance, and training.',stats:[['Employees','214'],['Present today','198'],['On leave','11'],['Open roles','6']],headers:['Employee','Role','Department','Project','Status'],rows:employees.map(x=>[x.name,x.role,x.department,x.project,x.status])},
 materials:{eyebrow:'SUPPLY CHAIN',title:<>Keep every site <em>supplied.</em></>,desc:'Track inventory, stock movements, material requests, receiving, suppliers, and site readiness.',stats:[['Inventory value','$1.4M'],['Low stock','8'],['Pending deliveries','12'],['Requests','24']],headers:['Material','Category','Project','Stock','Unit','Status'],rows:materials.map(x=>[x.name,x.category,x.project,String(x.stock),x.unit,x.status])},
 procurement:{eyebrow:'PROCUREMENT',title:<>Buy with <em>clarity.</em></>,desc:'Run requests, approvals, RFQs, quote comparisons, purchase orders, and receiving workflows.',stats:[['Requests','24'],['Open RFQs','9'],['Open POs','17'],['Monthly value','$820K']],headers:['Reference','Project','Supplier','Type','Value','Status'],rows:[['PR-1042','West Gate Business Center','Delta Steel','RFQ','$82,000','Quote review'],['PO-2311','Downtown Residence','Nile Cement','Purchase Order','$46,500','Ordered'],['PO-2314','North District Apartments','Delta Steel','Purchase Order','$138,000','In transit'],['PR-1048','Al Noor Villa','PowerLine','Request','$12,400','Pending approval']]},
 suppliers:{eyebrow:'SUPPLIERS',title:<>Relationships that <em>deliver.</em></>,desc:'Manage supplier records, orders, performance, compliance, and project coverage.',stats:[['Active suppliers','36'],['Open orders','17'],['Under review','3'],['Average rating','4.5']],headers:['Supplier','Category','Open orders','Rating','Status'],rows:suppliers.map(x=>[x.name,x.category,String(x.orders),String(x.rating),x.status])},
 equipment:{eyebrow:'EQUIPMENT',title:<>Keep assets <em>ready.</em></>,desc:'Track heavy equipment, assignments, utilization, inspections, maintenance, and work orders.',stats:[['Total equipment','64'],['In use','41'],['Maintenance','7'],['Available','16']],headers:['Equipment','Type','Site','Utilization','Next maintenance','Status'],rows:equipment.map(x=>[x.name,x.type,x.site,`${x.utilization}%`,x.nextMaintenance,x.status])},
 safety:{eyebrow:'SAFETY & COMPLIANCE',title:<>Build safely. Build <em>right.</em></>,desc:'Manage incidents, inspections, checklists, permits, toolbox talks, PPE, and corrective actions.',stats:[['Open incidents','3'],['Inspections due','8'],['Corrective actions','11'],['Compliance','96%']],headers:['Item','Site','Type','Owner','Priority','Status'],rows:[['Scaffold access observation','North District','Inspection','Safety Team','High','Open'],['PPE gap — masonry crew','West Gate','Observation','Site Supervisor','Medium','In progress'],['Fire extinguisher check','Downtown Residence','Checklist','Safety Officer','Low','Scheduled'],['Permit renewal','Al Noor Villa','Permit','Admin','Medium','Due']]},
 documents:{eyebrow:'DOCUMENT CONTROL',title:<>Every file, <em>in place.</em></>,desc:'Centralize plans, contracts, reports, permits, photos, versions, approvals, and access.',stats:[['Documents','3,842'],['Awaiting review','28'],['Versions this week','94'],['Shared','312']],headers:['Document','Type','Project','Version','Updated','Status'],rows:documents.map(x=>[x.name,x.type,x.project,x.version,x.updated,x.status])},
 contracts:{eyebrow:'CONTRACTS',title:<>Control every <em>commitment.</em></>,desc:'Manage client and subcontractor contracts, values, retention, terms, approvals, and change orders.',stats:[['Active contracts','42'],['Pending approval','5'],['Change orders','18'],['Retention','$420K']],headers:['Contract','Party','Project','Value','Expiry','Status'],rows:[['CTR-204','Nile Living','Downtown Residence','$1.20M','Mar 2027','Active'],['CTR-217','West Gate Holdings','West Gate Business Center','$1.65M','Jun 2027','Active'],['SUB-089','Delta MEP','North District Apartments','$340K','Dec 2026','Review'],['CO-034','Cairo Development','North District Apartments','$48K','—','Pending']]},
 reports:{eyebrow:'INSIGHTS',title:<>See the operation <em>clearly.</em></>,desc:'Executive and operational reports across projects, costs, procurement, workforce, equipment, and safety.',stats:[['Saved reports','18'],['Scheduled','7'],['Exports this month','42'],['Data sources','11']],headers:['Report','Scope','Owner','Last run','Format','Status'],rows:[['Portfolio performance','All projects','Ahmed Mahmoud','Today','PDF','Ready'],['Budget vs actual','All active','Finance','Yesterday','XLSX','Ready'],['Safety monthly','Field operations','Safety Officer','Oct 01','PDF','Ready'],['Workforce utilization','HR + Projects','HR','Oct 06','XLSX','Ready']]},
 estimating:{eyebrow:'PRECONSTRUCTION',title:<>Win better work <em>before it starts.</em></>,desc:'Build estimates, manage opportunities, compare bids, and convert awarded work into projects.',stats:[['Open opportunities','14'],['Active estimates','9'],['Bids due','5'],['Win rate','34%']],headers:['Opportunity','Client','Due','Estimate','Stage','Owner'],rows:[['Marina Offices','Harbor Group','Oct 14','$2.4M','Estimating','Ahmed Nabil'],['Palm Residence','Private Client','Oct 18','$760K','Bid review','Omar Khaled'],['Crescent Retail','Crescent Group','Oct 24','$1.1M','Proposal','Mariam Samir'],['North Clinic','Harbor Group','Oct 30','$1.8M','Qualification','Youssef Ali']]},
 boq:{eyebrow:'COST CONTROL',title:<>Know every quantity and <em>cost code.</em></>,desc:'Organize WBS, BOQ items, cost codes, budget allocations, committed cost, and actual cost.',stats:[['Cost codes','218'],['BOQ items','1,842'],['Budgeted','$4.8M'],['Committed','$3.9M']],headers:['Code','Description','Project','Budget','Committed','Status'],rows:[['03.30.00','Cast-in-place concrete','Downtown Residence','$420K','$365K','On track'],['05.12.00','Structural steel','West Gate','$610K','$588K','Watch'],['26.05.00','Electrical distribution','Al Noor Villa','$180K','$172K','On track'],['32.10.00','Exterior paving','North District','$96K','$112K','Over budget']]},
 rfis:{eyebrow:'PROJECT CONTROLS',title:<>Questions deserve <em>answers.</em></>,desc:'Track requests for information, ownership, design clarification, impact, and response history.',stats:[['Open RFIs','17'],['Awaiting response','9'],['Overdue','3'],['Closed','126']],headers:['RFI','Subject','Project','Submitted by','Due','Status'],rows:[['RFI-118','Slab opening detail','West Gate','Mariam Samir','Oct 08','Awaiting response'],['RFI-121','Facade material spec','Downtown Residence','Youssef Ali','Oct 10','Open'],['RFI-126','Drainage invert levels','North District','Mahmoud Adel','Oct 12','Review'],['RFI-130','Generator room clearance','Al Noor Villa','Ahmed Nabil','Oct 14','Closed']]},
 submittals:{eyebrow:'SUBMITTALS',title:<>Review before you <em>build.</em></>,desc:'Route shop drawings, material submittals, samples, and technical packages through approval workflows.',stats:[['Open submittals','31'],['Awaiting review','12'],['Approved','284'],['Revise & resubmit','9']],headers:['Submittal','Package','Project','Reviewer','Submitted','Status'],rows:[['SUB-302','Curtain wall system','West Gate','Consultant','Oct 06','Under review'],['SUB-315','Floor tile sample','Downtown Residence','Architect','Oct 05','Approved'],['SUB-322','LV panels','Al Noor Villa','MEP Lead','Oct 07','Revise & resubmit'],['SUB-328','Fire-rated doors','North District','Consultant','Oct 04','Approved']]},
 qaqc:{eyebrow:'QUALITY CONTROL',title:<>Quality is a <em>workflow.</em></>,desc:'Manage inspections, defects, punch lists, checklists, and corrective actions across sites.',stats:[['Inspections','38'],['Open defects','14'],['Punch items','28'],['Pass rate','94%']],headers:['Inspection','Site','Inspector','Score','Due','Status'],rows:[['Concrete pour — Level 4','Downtown Site','Omar Khaled','96%','Oct 08','Passed'],['Blockwork — Zone B','North Site','Mahmoud Adel','88%','Oct 09','Action needed'],['MEP rough-in','Al Noor Site','Ahmed Nabil','97%','Oct 10','Passed'],['Facade mock-up','West Gate','Mariam Samir','91%','Oct 12','Review']]},
 subcontractors:{eyebrow:'SUBCONTRACTORS',title:<>Coordinate the teams behind the <em>build.</em></>,desc:'Manage work packages, scopes, compliance, payment applications, retention, and performance.',stats:[['Active subs','29'],['Work packages','64'],['Pending apps','8'],['Compliance','97%']],headers:['Subcontractor','Package','Project','Value','Retention','Status'],rows:[['Delta MEP','Mechanical + Plumbing','North District','$340K','5%','Active'],['BuildPro Finishes','Finishes','Al Noor Villa','$180K','5%','Active'],['Prime Steel','Structural steel','West Gate','$520K','7.5%','Review'],['GreenScape','Landscape','Downtown Residence','$96K','5%','Active']]},
 meetings:{eyebrow:'COLLABORATION',title:<>Leave every meeting with <em>clarity.</em></>,desc:'Plan meetings, capture minutes, assign actions, and keep decisions attached to the project record.',stats:[['This week','8'],['Open actions','21'],['Minutes pending','3'],['Decisions logged','56']],headers:['Meeting','Project','Date','Owner','Open actions','Status'],rows:[['Weekly project review','Downtown Residence','Oct 08','Ahmed Mahmoud','4','Scheduled'],['Design coordination','West Gate','Oct 09','Mariam Samir','7','Scheduled'],['Commercial review','North District','Oct 10','Finance','3','Scheduled'],['Client progress review','Al Noor Villa','Oct 12','Youssef Ali','2','Scheduled']]},
 drawings:{eyebrow:'DRAWINGS & SHEETS',title:<>Build from the right <em>version.</em></>,desc:'Manage drawing sets, revisions, sheets, issue dates, distribution, and approvals.',stats:[['Drawing sets','46'],['Current sheets','1,284'],['Pending revision','18'],['Archived','412']],headers:['Drawing','Discipline','Project','Revision','Issued','Status'],rows:[['S-204 — Footing details','Structural','West Gate','Rev 04','Oct 06','Current'],['A-311 — Floor finishes','Architectural','Downtown Residence','Rev 07','Oct 05','Current'],['M-118 — Chilled water','Mechanical','North District','Rev 03','Oct 04','Review'],['E-220 — Lighting layout','Electrical','Al Noor Villa','Rev 06','Oct 07','Current']]},
 closeout:{eyebrow:'CLOSEOUT & HANDOVER',title:<>Finish well. Hand over <em>cleanly.</em></>,desc:'Track punch lists, as-builts, warranties, O&M manuals, approvals, and final handover.',stats:[['Projects closing','4'],['Punch items','28'],['Documents due','16'],['Handover readiness','91%']],headers:['Project','Punch list','As-builts','Warranties','Readiness','Status'],rows:[['Al Noor Villa','3 open','Ready','Ready','96%','Ready'],['Downtown Residence','8 open','In review','Ready','88%','In progress'],['West Gate Business Center','12 open','Pending','Pending','74%','At risk'],['North District Apartments','5 open','Ready','Ready','92%','In progress']]},
 settings:{eyebrow:'SYSTEM',title:<>Make Santo fit your <em>company.</em></>,desc:'Manage company settings, workspace preferences, integrations, security, notifications, and user access.',stats:[['Users','214'],['Roles','11'],['Integrations','8'],['Security checks','100%']],headers:['Setting area','Owner','Last updated','Status'],rows:[['Company profile','Admin','Oct 06','Configured'],['Users & roles','Admin','Oct 07','Configured'],['Notifications','Admin','Oct 05','Configured'],['Integrations','Admin','Oct 04','Configured']]}
 };
 const c=configs[kind]??configs.projects;
 const newAction:Record<string,string>={tasks:'New Task',schedule:'New Schedule Item',accounting:'New Transaction',hr:'New Employee',materials:'New Material',procurement:'New Purchase Request',suppliers:'New Supplier',equipment:'New Equipment',safety:'New Safety Incident',documents:'Upload Document',contracts:'New Contract',reports:'New Report',estimating:'New Estimate',boq:'New BOQ Item',rfis:'New RFI',submittals:'New Submittal',qaqc:'New Inspection',subcontractors:'New Subcontractor',meetings:'New Meeting',drawings:'New Drawing',closeout:'New Closeout Item',settings:'Workspace Settings'};
 return <><PageHeader eyebrow={c.eyebrow} title={c.title} desc={c.desc} actions={<><Button primary onClick={()=>openQuick(newAction[kind]??'Create New')}>New</Button><Button onClick={()=>openQuick(`Export ${c.eyebrow}`)}>Export</Button><Button onClick={()=>openQuick(`Filter ${c.eyebrow}`)}>Filters</Button></>}/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{c.stats.map(s=><StatCard key={s[0]} label={s[0]} value={s[1]} icon={<ChartNoAxesCombined size={18}/>}/>)}</div><div className="card mt-4 p-5"><div className="mb-4 flex items-start justify-between"><div><h2 className="serif text-2xl">{c.eyebrow.replace('PROJECT CONTROLS','Control center').replace('SUPPLY CHAIN','Supply chain')}</h2><p className="mt-1 text-xs text-[var(--graphite)]">Live demo data · Front-end workflow preview.</p></div><button className="rounded-full p-2 hover:bg-[var(--aged)]"><MoreHorizontal size={18}/></button></div><Table headers={c.headers} rows={c.rows.map(r=>r.map((x,i)=>i===r.length-1?<Status text={x} type={getStatusType(x)}/>:x))}/></div></>}

function Screen({current,runQuick,openQuick,lang}:{current:string;setNotice:()=>void;runQuick:(x:string)=>void;openQuick:(label?:string)=>void;lang:'en'|'ar'}){
 if(current==='overview')return <Dashboard runQuick={runQuick}/>;
 if(current==='projects')return <Projects openQuick={openQuick} lang={lang}/>;
 if(current==='field')return <Field openQuick={openQuick}/>;
 return <ModulePage kind={current} openQuick={openQuick}/>;
}

Задача была предложена датским учёным в области информатики Питером Мильтерсеном в 2003 году.
Суть задачи заключается в том, что каждый из 100 узников должен найти свой номер в одном из 100 ящиков, чтобы все они выжили; если хотя бы один не справится, умрут все. Каждый узник может открыть только 50 ящиков и не может общаться с другими узниками, за исключением предварительного обсуждения стратегии.
Если узник выбирает 50 ящиков из 100 случайным образом, вероятность того, что он найдет свой номер, составляет 50 %. Вероятность того, что все узники, открывая случайные ящики, найдут свои номера, является произведением вероятностей успеха отдельных узников, то есть ≈ 0,0000000000000000000000000000008 - исчезающе малое число. Ситуация кажется безнадёжной.
Существует стратегия, которая обеспечивает вероятность более, чем в 30 %, что узники выживут.
Каждый узник сначала открывает ящик со своим номером.
Если этот ящик содержит его номер, узник добился успеха.
В противном случае ящик содержит номер другого узника, и он открывает ящик с этим номером.
Узник повторяет шаги 2 и 3, пока не найдет свой номер или не откроет 50 ящиков.
Начиная перебор со своего собственного номера и идя по циклу, узник гарантирует, что находится в последовательности ящиков, заканчивающейся на его номер. Успешность его действий зависит только от того, будет ли эта последовательность длиннее 50 ящиков.

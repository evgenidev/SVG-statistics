
/*
  // Version 1: arrayToDataTable method
  var data2 = google.visualization.arrayToDataTable([
    ['Country', 'Population', 'Area'],
    ['CN', 1324, 9640821],
    ['IN', 1133, 3287263],
    ['US', 304, 9629091],
    ['ID', 232, 1904569],
    ['BR', 187, 8514877]
  ]);

  // Version 2: DataTable.addRows
  var data3 = new google.visualization.DataTable();
  data3.addColumn('string','Country');
  data3.addColumn('number','Population');
  data3.addColumn('number','Area');
  data3.addRows([
    ['CN', 1324, 9640821],
    ['IN', 1133, 3287263],
    ['US', 304, 9629091],
    ['ID', 232, 1904569],
    ['BR', 187, 8514877]
  ]);

  // Version 3: DataTable.setValue
  var data = new google.visualization.DataTable();
  data.addColumn('string','Country');
  data.addColumn('number', 'Population');
  data.addColumn('number', 'Area');
  data.addRows(5);
  data.setValue(0, 0, 'CN');
  data.setValue(0, 1, 1324);
  data.setValue(0, 2, 9640821);
  data.setValue(1, 0, 'IN');
  data.setValue(1, 1, 1133);
  data.setValue(1, 2, 3287263);
  data.setValue(2, 0, 'US');
  data.setValue(2, 1, 304);
  data.setValue(2, 2, 9629091);
  data.setValue(3, 0, 'ID');
  data.setValue(3, 1, 232);
  data.setValue(3, 2, 1904569);
  data.setValue(4, 0, 'BR');
  data.setValue(4, 1, 187);
  data.setValue(4, 2, 8514877);
	
	
*/

/*
	
displayMode	
	Which type of geochart this is. The DataTable format must match the value specified. The following values are supported:
	'auto' - Choose based on the format of the DataTable.
	'regions' - Color the regions on the geochart.
	'markers' - Place markers on the regions.
	'text' - Label the regions with text from the DataTable.

height:auto
width:auto
keepAspectRatio:true	
resolution:countries
	The resolution of the geochart borders. Choose one of the following values:
	
	'countries' - Supported for all regions, except for US state regions.
	'provinces' - Supported only for country regions and US state regions. Not supported for all countries; please test a country to see whether this option is supported.
	'metros' - Supported for the US country region and US state regions only.


Continent	Sub-Continent	Countries
002 - Africa	015 - Northern Africa	DZ, EG, EH, LY, MA, SD, TN
011 - Western Africa	BF, BJ, CI, CV, GH, GM, GN, GW, LR, ML, MR, NE, NG, SH, SL, SN, TG
017 - Middle Africa	AO, CD, ZR, CF, CG, CM, GA, GQ, ST, TD
014 - Eastern Africa	BI, DJ, ER, ET, KE, KM, MG, MU, MW, MZ, RE, RW, SC, SO, TZ, UG, YT, ZM, ZW
018 - Southern Africa	BW, LS, NA, SZ, ZA
150 - Europe	154 - Northern Europe	GG, JE, AX, DK, EE, FI, FO, GB, IE, IM, IS, LT, LV, NO, SE, SJ
155 - Western Europe	AT, BE, CH, DE, DD, FR, FX, LI, LU, MC, NL
151 - Eastern Europe	BG, BY, CZ, HU, MD, PL, RO, RU, SU, SK, UA
039 - Southern Europe	AD, AL, BA, ES, GI, GR, HR, IT, ME, MK, MT, CS, RS, PT, SI, SM, VA, YU
019 - Americas	021 - Northern America	BM, CA, GL, PM, US
029 - Caribbean	AG, AI, AN, AW, BB, BL, BS, CU, DM, DO, GD, GP, HT, JM, KN, KY, LC, MF, MQ, MS, PR, TC, TT, VC, VG, VI
013 - Central America	BZ, CR, GT, HN, MX, NI, PA, SV
005 - South America	AR, BO, BR, CL, CO, EC, FK, GF, GY, PE, PY, SR, UY, VE
142 - Asia	143 - Central Asia	TM, TJ, KG, KZ, UZ
030 - Eastern Asia	CN, HK, JP, KP, KR, MN, MO, TW
034 - Southern Asia	AF, BD, BT, IN, IR, LK, MV, NP, PK
035 - South-Eastern Asia	BN, ID, KH, LA, MM, BU, MY, PH, SG, TH, TL, TP, VN
145 - Western Asia	AE, AM, AZ, BH, CY, GE, IL, IQ, JO, KW, LB, OM, PS, QA, SA, NT, SY, TR, YE, YD
009 - Oceania	053 - Australia and New Zealand	AU, NF, NZ
054 - Melanesia	FJ, NC, PG, SB, VU
057 - Micronesia	FM, GU, KI, MH, MP, NR, PW
061 - Polynesia	AS, CK, NU, PF, PN, TK, TO, TV, WF, WS




region
	The area to display on the geochart. (Surrounding areas will be displayed as well.) Can be one of the following:
	'world' - A geochart of the entire world.
	A continent or a sub-continent, specified by its 3-digit code, e.g., '011' for Western Africa.
	A country, specified by its ISO 3166-1 alpha-2 code, e.g., 'AU' for Australia.
	A state in the United States, specified by its ISO 3166-2:US code, e.g., 'US-AL' for Alabama. Note that the resolution option must be set to either 'provinces' or 'metros'.


*/

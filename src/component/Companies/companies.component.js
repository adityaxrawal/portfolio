import React, { useState } from "react";
import "./companies.component.css";
// Constant array combining company name and career page URL.

const company_hr_list = {
    "company": "<Company_Name>",
    "company_career_link": "<Company_Career_Link>",

    "hr_list": [
        {
            "hr_name": "<HR_Name>",
            "hr_email": "<HR_Email>"
        },
        {
            "hr_name": "<HR_Name>",
            "hr_email": "<HR_Email>"
        },
        {
            "hr_name": "<HR_Name>",
            "hr_email": "<HR_Email>"
        }
    ]
}
const companiesData = [
    [
        { "name": "Walmart", "careerLink": "https://one.walmart.com/content/globaltechindia/en_in/results.html?job_function=&job_function=Technology&loc_filter=Bangalore&country=india", "employees": 2100000 },
        { "name": "Amazon", "careerLink": "https://www.amazon.jobs/content/en/teams/international-stores/india", "employees": 1500000 },
        { "name": "Accenture", "careerLink": "https://www.accenture.com/us-en/careers", "employees": 700000 },
        { "name": "Tata Consultancy Services", "careerLink": "https://www.tcs.com/careers", "employees": 600000 }
    ],
    [
        { "name": "IBM", "careerLink": "https://www.ibm.com/careers/search?field_keyword_08[0]=Software%20Engineering&field_keyword_18[0]=Entry%20Level&field_keyword_05[0]=India&sort=dcdate_desc", "employees": 300000 },
        { "name": "Infosys", "careerLink": "https://www.infosys.com/careers", "employees": 300000 },
        { "name": "Wipro", "careerLink": "https://careers.wipro.com", "employees": 250000 },
        { "name": "Microsoft", "careerLink": "https://careers.microsoft.com", "employees": 220000 }
    ],
    [
        { "name": "Google", "careerLink": "https://careers.google.com", "employees": 190000 },
        { "name": "Apple", "careerLink": "https://www.apple.com/careers", "employees": 160000 },
        { "name": "Cognizant", "careerLink": "https://careers.cognizant.com", "employees": 150000 },
        { "name": "Capgemini", "careerLink": "https://www.capgemini.com/careers", "employees": 140000 }
    ],
    [
        { "name": "Tech Mahindra", "careerLink": "https://careers.techmahindra.com", "employees": 120000 },
        { "name": "HCL Technologies", "careerLink": "https://www.hcltech.com/careers", "employees": 110000 },
        { "name": "Deloitte", "careerLink": "https://www2.deloitte.com/global/en/careers", "employees": 100000 },
        { "name": "Oracle", "careerLink": "https://www.oracle.com/corporate/careers", "employees": 90000 }
    ],
    [
        { "name": "Cisco", "careerLink": "https://jobs.cisco.com", "employees": 80000 },
        { "name": "EY", "careerLink": "https://www.ey.com/en_in/careers", "employees": 75000 },
        { "name": "Pwc", "careerLink": "https://www.pwc.in/careers/experienced-jobs/results.html?wdcountry=IND&wdjobsite=Global_Experienced_Careers&flds=jobreqid,title,location,jobsite,iso&wdgrade=1840265", "employees": 70000 },
        { "name": "Goldman Sachs", "careerLink": "https://www.goldmansachs.com/careers", "employees": 65000 }
    ],
    [
        { "name": "JP Morgan", "careerLink": "https://careers.jpmorgan.com", "employees": 60000 },
        { "name": "Siemens", "careerLink": "https://new.siemens.com/global/en/company/jobs.html", "employees": 55000 },
        { "name": "Bosch", "careerLink": "https://careers.smartrecruiters.com/BoschGroup/india", "employees": 50000 },
        { "name": "Adobe", "careerLink": "https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced", "employees": 45000 }
    ],
    [
        { "name": "Salesforce", "careerLink": "https://www.salesforce.com/company/careers", "employees": 40000 },
        { "name": "Paypal", "careerLink": "https://paypal.eightfold.ai/careerhub/explore/jobs/274905069998", "employees": 35000 },
        { "name": "American Express", "careerLink": "https://careers.americanexpress.com", "employees": 30000 },
        { "name": "Standard Chartered Bank", "careerLink": "https://www.sc.com/en/careers", "employees": 28000 }
    ],
    [
        { "name": "Visa", "careerLink": "https://usa.visa.com/careers", "employees": 25000 },
        { "name": "UnitedHealth Group", "careerLink": "https://www.unitedhealthgroup.com/careers", "employees": 24000 },
        { "name": "Citibank", "careerLink": "https://www.citi.com/careers", "employees": 23000 },
        { "name": "HSBC", "careerLink": "https://www.hsbc.com/careers", "employees": 22000 }
    ],
    [
        { "name": "Flipkart", "careerLink": "https://www.flipkartcareers.com", "employees": 20000 },
        { "name": "Paytm", "careerLink": "https://careers.paytm.com", "employees": 15000 },
        { "name": "Jio", "careerLink": "https://www.jio.com/careers", "employees": 12000 },
        { "name": "Atlassian", "careerLink": "https://www.atlassian.com/company/careers", "employees": 10000 }
    ],
    [
        { "name": "Intuit", "careerLink": "https://www.intuit.com/careers", "employees": 9000 },
        { "name": "Samsung Electro-Mechanics", "careerLink": "https://www.samsungcareers.com", "employees": 8000 },
        { "name": "Tata Elxsi", "careerLink": "https://www.tataelxsi.com/careers", "employees": 7000 },
        { "name": "Red Hat", "careerLink": "https://www.redhat.com/en/jobs", "employees": 6000 }
    ],
    [
        { "name": "Razorpay", "careerLink": "https://razorpay.com/careers", "employees": 5000 },
        { "name": "PhonePe", "careerLink": "https://www.phonepe.com/careers/job-openings/", "employees": 4000 },
        { "name": "Meesho", "careerLink": "https://careers.meesho.com", "employees": 3000 },
        { "name": "Akamai Technologies", "careerLink": "https://www.akamai.com/careers", "employees": 2500 }
    ],
    [
        { "name": "Zerodha", "careerLink": "https://zerodha.com/careers", "employees": 2000 },
        { "name": "Inmobi", "careerLink": "https://www.inmobi.com/careers", "employees": 1500 },
        { "name": "CoinDCX", "careerLink": "https://coindcx.com/careers", "employees": 1000 },
        { "name": "Juspay", "careerLink": "https://www.juspay.in/careers", "employees": 800 }
    ],
    [
        { "name": "Scaler", "careerLink": "https://www.scaler.com/careers", "employees": 700 },
        { "name": "WebEngage", "careerLink": "https://webengage.com/current-openings/#JobOpenings", "employees": 600 },
        { "name": "Tekion", "careerLink": "https://tekion.com/job-openings/india/all?department=Engineering", "employees": 500 },
        { "name": "Zepto", "careerLink": "https://www.zepto.in/careers", "employees": 450 }
    ],
    [
        { "name": "Postman", "careerLink": "https://www.postman.com/careers", "employees": 400 },
        { "name": "Licious", "careerLink": "https://licious.darwinbox.in/ms/candidate/careers", "employees": 350 },
        { "name": "1mg", "careerLink": "https://1mg.darwinbox.in/ms/candidate/careers", "employees": 300 },
        { "name": "Jupiter", "careerLink": "https://jupiter.money/careers/#all-openings", "employees": 250 }
    ],
    [
        { "name": "CarWale", "careerLink": "https://www.carwale.com/career/", "employees": 200 },
        { "name": "Smallcase", "careerLink": "https://www.smallcase.com/careers", "employees": 180 },
        { "name": "Sapiens", "careerLink": "https://careers.sapiens.com/", "employees": 160 },
        { "name": "Angel One", "careerLink": "https://www.angelone.in/careers", "employees": 150 }
    ],
    [
        { "name": "Unstop", "careerLink": "https://unstop.com/careers", "employees": 140 },
        { "name": "Paisabazaar", "careerLink": "https://www.paisabazaar.com/careers", "employees": 130 },
        { "name": "LambdaTest", "careerLink": "https://www.lambdatest.com/careers", "employees": 120 },
        { "name": "GeeksforGeeks", "careerLink": "https://www.geeksforgeeks.org/careers", "employees": 110 }
    ],
    [
        { "name": "Nagarro", "careerLink": "https://www.nagarro.com/en/careers", "employees": 100 },
        { "name": "Hashnode", "careerLink": "https://hashnode.com/careers", "employees": 90 },
        { "name": "Hike", "careerLink": "https://hike.in/careers", "employees": 80 },
        { "name": "TradingView", "careerLink": "https://www.tradingview.com/careers", "employees": 70 }
    ],
    [
        { "name": "Snaptrude", "careerLink": "https://www.snaptrude.com/careers", "employees": 65 },
        { "name": "Quince", "careerLink": "https://job-boards.greenhouse.io/quince?offices%5B%5D=4016256008", "employees": 60 },
        { "name": "Pay", "careerLink": "https://www.pay.com/careers", "employees": 55 },
        { "name": "Fuel", "careerLink": "https://www.fuel.com/careers", "employees": 50 }
    ],
    [
        { "name": "1 Click Tech", "careerLink": "https://www.1clicktech.com/careers", "employees": 45 },
        { "name": "24-7 Intouch", "careerLink": "https://www.247intouch.com/careers", "employees": 40 },
        { "name": "A.P. Moller - Maersk", "careerLink": "https://www.maersk.com/careers", "employees": 35000 }, // Large company misplaced earlier
        { "name": "Adidas", "careerLink": "https://www.adidas-group.com/en/careers", "employees": 30000 } // Large company misplaced earlier
    ],
    [
        { "name": "Akshaydeep Public School", "careerLink": "https://akshaydeeppublicschool.com/careers", "employees": 35 },
        { "name": "Aludecor", "careerLink": "https://www.aludecor.com/careers", "employees": 30 },
        { "name": "Anzy Global", "careerLink": "https://www.anzyglobal.com/careers", "employees": 25 },
        { "name": "Apisero Inc.", "careerLink": "https://www.apisero.com/careers", "employees": 20 }
    ],
    [
        { "name": "Applore Technologies", "careerLink": "https://applore.in/careers", "employees": 18 },
        { "name": "Aquera", "careerLink": "https://www.aquera.com/careers", "employees": 15 },
        { "name": "Arctic Fox", "careerLink": "https://www.arcticfox.com/careers", "employees": 12 },
        { "name": "Arcesium", "careerLink": "https://www.arcesium.com/careers", "employees": 200 } // Mid-sized company misplaced earlier
    ],
    [
        { "name": "Ashok Leyland", "careerLink": "https://www.ashokleyland.com/careers", "employees": 10000 }, // Mid-sized company misplaced earlier
        { "name": "Aurigo Software Technologies", "careerLink": "https://www.aurigo.com/careers", "employees": 150 },
        { "name": "Aurionpro", "careerLink": "https://www.aurionpro.com/careers", "employees": 120 },
        { "name": "Autodesk", "careerLink": "https://www.autodesk.com/careers", "employees": 11000 } // Mid-sized company misplaced earlier
    ],
    [
        { "name": "Autviz Solutions", "careerLink": "https://www.autviz.com/careers", "employees": 10 },
        { "name": "Bajaj Auto Credit Limited", "careerLink": "https://www.bajajauto.com/careers", "employees": 5000 }, // Mid-sized company misplaced earlier
        { "name": "Bajaj Finserv Health", "careerLink": "https://www.bajajfinservhealth.in/careers", "employees": 200 },
        { "name": "Baader Bank AG", "careerLink": "https://www.baaderbank.de/careers", "employees": 150 }
    ],
    [
        { "name": "Barracuda", "careerLink": "https://www.barracuda.com/company/careers", "employees": 1000 },
        { "name": "Basiq360", "careerLink": "https://www.basiq360.com/careers", "employees": 20 },
        { "name": "Bharat Intern", "careerLink": "https://bharatintern.in/careers", "employees": 15 },
        { "name": "Bhabha Atomic Research Centre", "careerLink": "https://www.barc.gov.in/careers", "employees": 5000 } // Mid-sized entity misplaced earlier
    ],
    [
        { "name": "Birlasoft", "careerLink": "https://www.birlasoft.com/careers", "employees": 4000 },
        { "name": "BlackBuck (Zinka Logistics Solutions Pvt. Ltd.)", "careerLink": "https://www.blackbuck.com/careers", "employees": 300 },
        { "name": "Blink Health", "careerLink": "https://www.blinkhealth.com/careers", "employees": 250 },
        { "name": "Blue Tokai Coffee Roasters", "careerLink": "https://www.bluetokaicoffee.com/careers", "employees": 200 }
    ],
    [
        { "name": "Boomi", "careerLink": "https://boomi.com/company/careers", "employees": 1500 },
        { "name": "Borderless Access", "careerLink": "https://www.borderlessaccess.com/careers", "employees": 100 },
        { "name": "Bread Financial", "careerLink": "https://www.breadfinancial.com/careers", "employees": 7000 }, // Mid-sized company misplaced earlier
        { "name": "Bravura Solutions", "careerLink": "https://www.bravurasolutions.com/careers", "employees": 1200 }
    ],
    [
        { "name": "Brands and US", "careerLink": "https://www.brandsandus.in/careers", "employees": 50 },
        { "name": "Brandingwaale Webtech", "careerLink": "https://www.brandingwaale.com/careers", "employees": 30 },
        { "name": "Bright Money", "careerLink": "https://www.brightmoney.com/careers", "employees": 80 },
        { "name": "Bristol Myers Squibb", "careerLink": "https://www.bms.com/careers", "employees": 30000 } // Large company misplaced earlier
    ],
    [
        { "name": "Capgemini Engineering", "careerLink": "https://www.capgemini.com/careers", "employees": 140000 }, // Subset of Capgemini, same link
        { "name": "CEDCOSS Technologies Private Limited", "careerLink": "https://www.cedcoss.com/careers", "employees": 200 },
        { "name": "Certa.ai", "careerLink": "https://www.certa.ai/careers", "employees": 50 },
        { "name": "Chegg Inc.", "careerLink": "https://careers.chegg.com", "employees": 2000 }
    ],
    [
        { "name": "Cimpress India", "careerLink": "https://www.cimpress-india.com/careers", "employees": 500 },
        { "name": "Cleartrip", "careerLink": "https://www.cleartrip.com/careers", "employees": 300 },
        { "name": "Clouclix Softwares Pvt Ltd", "careerLink": "https://www.clouclix.com/careers", "employees": 40 },
        { "name": "Clearsulting", "careerLink": "https://www.clearsulting.com/careers", "employees": 150 }
    ],
    [
        { "name": "CommScope", "careerLink": "https://www.commscope.com/careers", "employees": 30000 }, // Large company misplaced earlier
        { "name": "Commvault", "careerLink": "https://www.commvault.com/company/careers", "employees": 2500 },
        { "name": "Commonwealth Bank", "careerLink": "https://www.commbank.com.au/about-us/careers", "employees": 40000 }, // Large company misplaced earlier
        { "name": "Compunnel Inc.", "careerLink": "https://www.compunnel.com/careers", "employees": 1000 }
    ],
    [
        { "name": "Convin.ai", "careerLink": "https://www.convin.ai/careers", "employees": 60 },
        { "name": "Couchbase", "careerLink": "https://www.couchbase.com/careers", "employees": 700 },
        { "name": "Crowe", "careerLink": "https://www.crowe.com/careers", "employees": 4000 },
        { "name": "Cyient", "careerLink": "https://www.cyient.com/careers", "employees": 15000 } // Mid-sized company misplaced earlier
    ],
    [
        { "name": "D. E. Shaw India Private Limited", "careerLink": "https://www.deshawindia.com/careers", "employees": 1500 },
        { "name": "Daffodil Software", "careerLink": "https://www.daffodilsw.com/careers", "employees": 1000 },
        { "name": "Datagrid Solutions", "careerLink": "https://www.datagridsolutions.com/careers", "employees": 50 },
        { "name": "DevelUp", "careerLink": "https://www.develup.com/careers", "employees": 30 }
    ],
    [
        { "name": "DevTown", "careerLink": "https://www.devtown.com/careers", "employees": 25 },
        { "name": "Deutsche Bank", "careerLink": "https://www.db.com/careers", "employees": 80000 }, // Large company misplaced earlier
        { "name": "Divyera Engineers", "careerLink": "https://divyera.com/careers", "employees": 20 },
        { "name": "Docusign", "careerLink": "https://www.docusign.com/company/careers", "employees": 7000 } // Mid-sized company misplaced earlier
    ],
    [
        { "name": "Doryo", "careerLink": "https://www.doryo.com/careers", "employees": 15 },
        { "name": "Drop Organization", "careerLink": "https://www.droporganization.com/careers", "employees": 10 },
        { "name": "Dunnhumby", "careerLink": "https://www.dunnhumby.com/careers", "employees": 2500 },
        { "name": "Eastern Software Solutions", "careerLink": "https://www.easternsoft.com/careers", "employees": 100 }
    ],
    [
        { "name": "Eazy ERP Technologies Pvt Ltd", "careerLink": "https://www.eazyerp.com/careers", "employees": 80 },
        { "name": "Eazotel", "careerLink": "https://www.eazotel.com/careers", "employees": 30 },
        { "name": "Electioncare", "careerLink": "https://www.electioncare.in/careers", "employees": 20 },
        { "name": "Elevate K-12", "careerLink": "https://www.elevatek12.com/careers", "employees": 200 }
    ],
    [
        { "name": "EMB Global", "careerLink": "https://www.embglobal.com/careers", "employees": 50 },
        { "name": "Emids", "careerLink": "https://www.emids.com/careers", "employees": 3000 },
        { "name": "Empresstechh.Inc", "careerLink": "https://www.empresstechh.com/careers", "employees": 15 },
        { "name": "Energy Exemplar", "careerLink": "https://www.energyexemplar.com/careers", "employees": 150 }
    ],
    [
        { "name": "Ericsson", "careerLink": "https://www.ericsson.com/en/careers", "employees": 100000 }, // Large company misplaced earlier
        { "name": "Esko", "careerLink": "https://www.esko.com/en/careers", "employees": 1800 },
        { "name": "Excellence Technologies Pvt. Ltd.", "careerLink": "https://www.excellencetech.com/careers", "employees": 100 },
        { "name": "Exotic Learning", "careerLink": "https://www.exoticlearning.com/careers", "employees": 20 }
    ],
    [
        { "name": "Fidelity Investments", "careerLink": "https://jobs.fidelity.com", "employees": 50000 }, // Large company misplaced earlier
        { "name": "Fintopio", "careerLink": "https://www.fintopio.com/careers", "employees": 30 },
        { "name": "First Salary", "careerLink": "https://www.firstsalary.com/careers", "employees": 25 },
        { "name": "Freelancer.com", "careerLink": "https://www.freelancer.com/jobs/", "employees": 500 }
    ],
    [
        { "name": "FreightMango", "careerLink": "https://www.freightmango.com/careers", "employees": 40 },
        { "name": "FPL Technologies", "careerLink": "https://fpltechnologies.com/careers", "employees": 150 },
        { "name": "Gainsight", "careerLink": "https://www.gainsight.com/company/careers", "employees": 1000 },
        { "name": "Genex Pharma", "careerLink": "https://www.genexpharma.com/careers", "employees": 200 }
    ],
    [
        { "name": "Genpact", "careerLink": "https://careers.genpact.com", "employees": 100000 }, // Large company misplaced earlier
        { "name": "Gemini Solutions Pvt Ltd", "careerLink": "https://www.geminisolutions.com/careers", "employees": 300 },
        { "name": "Ghost", "careerLink": "https://ghost.org/careers", "employees": 50 },
        { "name": "Glance", "careerLink": "https://www.glance.com/careers", "employees": 400 }
    ],
    [
        { "name": "GlobalLogic", "careerLink": "https://www.globallogic.com/careers", "employees": 20000 }, // Mid-sized company misplaced earlier
        { "name": "Gojek", "careerLink": "https://www.gojek.com/careers", "employees": 3000 },
        { "name": "Gnrgy IN", "careerLink": "https://www.gnrgy.in/careers", "employees": 20 },
        { "name": "Gushwork", "careerLink": "https://www.gushwork.com/careers", "employees": 30 }
    ],
    [
        { "name": "HappyFox", "careerLink": "https://www.happyfox.com/careers", "employees": 100 },
        { "name": "Happiest Minds Technologies", "careerLink": "https://www.happiestminds.com/careers", "employees": 4000 },
        { "name": "HashedIn by Deloitte", "careerLink": "https://www.hashedin.com/careers", "employees": 1000 },
        { "name": "Hexaware Technologies", "careerLink": "https://hexaware.com/careers", "employees": 20000 } // Mid-sized company misplaced earlier
    ],
    [
        { "name": "HNM Solutions Europe", "careerLink": "https://www.hnmsolutions.eu/careers", "employees": 50 },
        { "name": "ICANN", "careerLink": "https://www.icann.org/careers", "employees": 400 },
        { "name": "ICONMA", "careerLink": "https://www.iconma.com/careers", "employees": 1500 },
        { "name": "Indian Institute of Technology, Roorkee", "careerLink": "https://www.iitr.ac.in/careers", "employees": 1000 }
    ],
    [
        { "name": "Indium", "careerLink": "https://www.indiumsoftware.com/careers", "employees": 2000 },
        { "name": "Intellect Design Arena Ltd", "careerLink": "https://www.intellectdesign.com/careers", "employees": 4000 },
        { "name": "iSpace, Inc.", "careerLink": "https://www.ispace.com/careers", "employees": 300 },
        { "name": "ITC Hotels", "careerLink": "https://www.itchotels.com/careers", "employees": 5000 } // Mid-sized company misplaced earlier
    ],
    [
        { "name": "Jagran Prakashan Ltd.", "careerLink": "https://www.jagranjosh.com/careers", "employees": 6000 },
        { "name": "Jar", "careerLink": "https://www.myjar.com/careers", "employees": 50 },
        { "name": "Kantar", "careerLink": "https://www.kantar.com/careers", "employees": 30000 }, // Large company misplaced earlier
        { "name": "Kansoft Solutions Pvt. Ltd.", "careerLink": "https://www.kansoftsolutions.com/careers", "employees": 30 }
    ],
    [
        { "name": "K{r}eeda Labs", "careerLink": "https://kreedalabs.com/careers", "employees": 20 },
        { "name": "Kennect Inc.", "careerLink": "https://www.kennect.io/careers", "employees": 40 },
        { "name": "Kip.bi", "careerLink": "https://www.kip.bi/careers", "employees": 15 },
        { "name": "Koenig Solutions Pvt. Ltd.", "careerLink": "https://www.koenig-solutions.com/careers", "employees": 200 }
    ],
    [
        { "name": "Korn Ferry", "careerLink": "https://www.kornferry.com/careers", "employees": 8000 },
        { "name": "Kotak Mahindra Bank", "careerLink": "https://www.kotak.com/en/careers", "employees": 50000 }, // Large company misplaced earlier
        { "name": "Kotak811", "careerLink": "https://www.kotak811.com/careers", "employees": 300 },
        { "name": "KPMG UK", "careerLink": "https://home.kpmg/uk/en/home/careers.html", "employees": 20000 } // Mid-sized subset misplaced earlier
    ],
    [
        { "name": "Kpit Technologies", "careerLink": "https://www.kpit.com/careers", "employees": 7000 },
        { "name": "Kyndryl India", "careerLink": "https://www.kyndryl.com/careers", "employees": 90000 }, // Large company misplaced earlier
        { "name": "Laghu Udyog Bharati - India", "careerLink": "https://www.laghu-udyog.com/careers", "employees": 50 },
        { "name": "LeadSquared", "careerLink": "https://www.leadsquared.com/careers", "employees": 600 }
    ],
    [
        { "name": "LikeMinds", "careerLink": "https://www.likeminds.ai/careers", "employees": 40 },
        { "name": "Lloyds Technology Centre India", "careerLink": "https://www.lloydsbankinggroup.com/careers", "employees": 2000 },
        { "name": "Log-hub AG", "careerLink": "https://www.log-hub.com/careers", "employees": 30 },
        { "name": "LSEG (London Stock Exchange Group)", "careerLink": "https://www.lseg.com/careers", "employees": 25000 } // Large company misplaced earlier
    ],
    [
        { "name": "MAQ Software", "careerLink": "https://www.maqsoftware.com/careers", "employees": 500 },
        { "name": "Manhattan Associates", "careerLink": "https://www.manh.com/careers", "employees": 4000 },
        { "name": "Maharana Pratap Group of Institutions", "careerLink": "https://mpgi.edu.in/careers", "employees": 300 },
        { "name": "MediaMonks", "careerLink": "https://www.mediamonks.com/careers", "employees": 6000 }
    ],
    [
        { "name": "Mettl", "careerLink": "https://www.mettl.com/careers", "employees": 400 },
        { "name": "Mistral Solutions Pvt. Ltd", "careerLink": "https://www.mistralsolutions.com/careers", "employees": 1000 },
        { "name": "Model United Nations", "careerLink": "https://www.un.org/en/mun/careers", "employees": 50 },
        { "name": "Montecarlo Limited", "careerLink": "https://www.montecarlolimited.com/careers", "employees": 2000 }
    ],
    [
        { "name": "MountBlue Technologies", "careerLink": "https://www.mountblue.com/careers", "employees": 300 },
        { "name": "Mu Sigma Inc.", "careerLink": "https://www.mu-sigma.com/careers", "employees": 3500 },
        { "name": "MSD", "careerLink": "https://www.msdindia.com/careers", "employees": 15000 }, // Mid-sized company misplaced earlier
        { "name": "NCR Corporation", "careerLink": "https://www.ncr.com/careers", "employees": 30000 } // Large company misplaced earlier
    ],
    [
        { "name": "Nektar.ai", "careerLink": "https://www.nektar.ai/careers", "employees": 40 },
        { "name": "NetNut.io", "careerLink": "https://netnut.io/careers", "employees": 30 },
        { "name": "Neowise Technologies", "careerLink": "https://www.neowise.com/careers", "employees": 20 },
        { "name": "Newton School", "careerLink": "https://www.newtonschool.co/careers", "employees": 150 }
    ],
    [
        { "name": "Nife", "careerLink": "https://www.nife.io/careers", "employees": 25 },
        { "name": "Nisum", "careerLink": "https://www.nisum.com/careers", "employees": 2000 },
        { "name": "Niveus Solutions", "careerLink": "https://www.niveussolutions.com/careers", "employees": 100 },
        { "name": "NSE India", "careerLink": "https://www.nseindia.com/careers", "employees": 500 }
    ],
    [
        { "name": "NSEIT LIMITED", "careerLink": "https://www.nseit.com/careers", "employees": 2000 },
        { "name": "Nutrabay", "careerLink": "https://www.nutrabay.com/careers", "employees": 50 },
        { "name": "OctaNet", "careerLink": "https://www.octanet.in/careers", "employees": 30 },
        { "name": "OnlineStudy4u", "careerLink": "https://www.onlinestudy4u.in/careers", "employees": 20 }
    ],
    [
        { "name": "OpenIntervue", "careerLink": "https://www.openintervue.com/careers", "employees": 15 },
        { "name": "Orange Business", "careerLink": "https://www.orange-business.com/en/careers", "employees": 30000 }, // Large company misplaced earlier
        { "name": "Outlier", "careerLink": "https://www.outlier.ai/careers", "employees": 100 },
        { "name": "Pachranga Agro Foods Pvt. Ltd", "careerLink": "https://www.pachranga.com/careers", "employees": 50 }
    ],
    [
        { "name": "Partnr", "careerLink": "https://www.partnr.com/careers", "employees": 20 },
        { "name": "Pitchgod Pvt Limited", "careerLink": "https://www.pitchgod.in/careers", "employees": 15 },
        { "name": "Powerplay", "careerLink": "https://www.powerplay.construction/careers", "employees": 40 },
        { "name": "Prismbiz", "careerLink": "https://www.prismbiz.com/careers", "employees": 30 }
    ],
    [
        { "name": "Private yoga studio", "careerLink": "https://www.privateyogastudio.com/careers", "employees": 10 },
        { "name": "Protiviti", "careerLink": "https://www.protiviti.com/careers", "employees": 5000 },
        { "name": "Pylon Management Consulting", "careerLink": "https://www.pylonconsulting.com/careers", "employees": 50 },
        { "name": "Qualitest", "careerLink": "https://www.qualitestgroup.com/careers", "employees": 7000 }
    ],
    [
        { "name": "Qualys", "careerLink": "https://www.qualys.com/careers", "employees": 2000 },
        { "name": "Rakuten Symphony", "careerLink": "https://rakutensymphony.com/careers", "employees": 1000 },
        { "name": "Razorse Software", "careerLink": "https://www.razorse.com/careers", "employees": 50 },
        { "name": "Relanto", "careerLink": "https://www.relanto.ai/careers", "employees": 30 }
    ],
    [
        { "name": "Recruit CRM", "careerLink": "https://recruitcrm.io/careers", "employees": 40 },
        { "name": "S&P Global", "careerLink": "https://careers.spglobal.com", "employees": 35000 }, // Large company misplaced earlier
        { "name": "Saleschat.pro", "careerLink": "https://www.saleschat.pro/careers", "employees": 20 },
        { "name": "Sandeep Goswami Associates", "careerLink": "https://www.sandeepgoswamiassociates.com/careers", "employees": 15 }
    ],
    [
        { "name": "Secure Meters Limited", "careerLink": "https://www.securemeters.com/careers", "employees": 1000 },
        { "name": "Self-employed", "careerLink": "https://www.selfemployed.com/careers", "employees": 1 }, // Not a company, placeholder
        { "name": "SHL", "careerLink": "https://www.shl.com/careers", "employees": 500 },
        { "name": "SimplifyVMS", "careerLink": "https://www.simplifyvms.com/careers", "employees": 100 }
    ],
    [
        { "name": "Singhania Buildcon Group", "careerLink": "https://www.singhaniabuildcon.com/careers", "employees": 50 },
        { "name": "SkilloVilla", "careerLink": "https://www.skillovilla.com/careers", "employees": 30 },
        { "name": "Soft Solutions", "careerLink": "https://www.softsolutionsindia.com/careers", "employees": 20 },
        { "name": "Sony India Software Centre", "careerLink": "https://www.sony.co.in/careers", "employees": 2000 }
    ],
    [
        { "name": "Sopra Banking Software", "careerLink": "https://www.soprabankingsolutions.com/careers", "employees": 5000 },
        { "name": "Stealth", "careerLink": "https://www.stealthstartup.com/careers", "employees": 10 },
        { "name": "STAGE - OTT for Bharat", "careerLink": "https://www.stage.in/careers", "employees": 50 },
        { "name": "Target", "careerLink": "https://www.target.com/careers", "employees": 400000 } // Large company misplaced earlier
    ],
    [
        { "name": "TELUS Digital", "careerLink": "https://www.telus.com/en/careers", "employees": 50000 }, // Large company misplaced earlier
        { "name": "The Futurepreneur", "careerLink": "https://www.thefuturepreneur.com/careers", "employees": 20 },
        { "name": "ThirdEye AI (A JBM Group Company)", "careerLink": "https://www.thirdeye.ai/careers", "employees": 100 },
        { "name": "Times of Global", "careerLink": "https://www.timesofglobal.com/careers", "employees": 15 }
    ],
    [
        { "name": "Timepass Games", "careerLink": "https://www.timepassgames.com/careers", "employees": 10 },
        { "name": "TransFi", "careerLink": "https://www.transfi.com/careers", "employees": 30 },
        { "name": "Two Brahmins", "careerLink": "https://www.twobrahmins.com/careers", "employees": 20 },
        { "name": "Unikomm", "careerLink": "https://www.unikomm.com/careers", "employees": 15 }
    ],
    [
        { "name": "Wave Infratech Pvt Ltd", "careerLink": "https://www.waveinfratech.com/careers", "employees": 50 },
        { "name": "Webito Infotech", "careerLink": "https://www.webitoinfotech.com/careers", "employees": 30 },
        { "name": "ZS", "careerLink": "https://www.zs.com/careers", "employees": 10000 }, // Mid-sized company misplaced earlier
        { "name": "BT", "careerLink": "https://www.bt.com/careers", "employees": 100000 } // Large company misplaced earlier
    ],
    [
        { "name": "GE", "careerLink": "https://www.ge.com/careers", "employees": 170000 }, // Large company misplaced earlier
        { "name": "LG", "careerLink": "https://www.lg.com/careers", "employees": 75000 }, // Large company misplaced earlier
        { "name": "Benz", "careerLink": "https://jobs.mercedes-benz.com/en?en%3FPositionFormattedDescription.Content=&PositionLocation.Country=%5B390%5D&JobCategory.Code=%5B46%5D", "employees": 170000 }, // Mercedes-Benz, large company misplaced earlier
        { "name": "Sunlife Global", "careerLink": "https://www.sunlife.com/careers", "employees": 40000 } // Large company misplaced earlier
    ],
    [
        { "name": "Novartis", "careerLink": "https://www.novartis.com/careers/career-search?search_api_fulltext=&country%5B0%5D=LOC_IN&field_job_posted_date=2&op=Submit&page=0", "employees": 100000 }, // Large company misplaced earlier
        { "name": "Azentio", "careerLink": "https://www.azentio.com/careers", "employees": 1000 },
        { "name": "ACCURA TEQUIPMENT", "careerLink": "https://accuraequipment.com/careers", "employees": 50 },
        { "name": "L&T Hydrocarbon Engineering Limited", "careerLink": "https://www.lnthydrocarbon.com/careers", "employees": 5000 } // Mid-sized company misplaced earlier
    ]
];

const CompaniesTable = () => {
    // Track which companies have been clicked using their global index 
    const [clickedRows, setClickedRows] = useState(Array.from({ length: companiesData.length }, () => Array(4).fill(false)));


    const handleRowClick = (index) => {
        setClickedRows((prev) => ({
            ...prev,
            [index]: !prev[index] // Toggle background color on click
        }));
    }


    return (
        <div className="table-container">
            <table className="companies-table">
                <tbody>
                    {companiesData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => handleRowClick(rowIndex)}
                            className="table-row"
                        >
                            {row.map((company, colIndex) => (
                                <td key={colIndex}>
                                    <div className="company-cell">
                                        <a
                                            href={company.careerLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Stop row click event
                                                setClickedRows((prev) => {
                                                    const newState = prev.map(row => [...row]); // Clone array
                                                    newState[rowIndex][colIndex] = true; // Mark as clicked
                                                    return newState;
                                                });
                                            }}
                                            style={{ backgroundColor: clickedRows[rowIndex][colIndex] ? "lightskyblue" : "white" }}
                                        >
                                            {company.name}
                                        </a>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompaniesTable;

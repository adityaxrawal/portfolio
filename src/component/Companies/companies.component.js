import React, { useState } from "react";
import "./companies.component.css";
// Constant array combining company name and career page URL.
const companiesData = [
    [
        { "name": "PhonePe", "careerLink": "https://www.phonepe.com/careers/job-openings/" },
        { "name": "IBM", "careerLink": "https://www.ibm.com/careers/search?field_keyword_08[0]=Software%20Engineering&field_keyword_18[0]=Entry%20Level&field_keyword_05[0]=India&sort=dcdate_desc" },
        { "name": "Jupiter", "careerLink": "https://jupiter.money/careers/#all-openings" },
        { "name": "Novartis", "careerLink": "https://www.novartis.com/careers/career-search?search_api_fulltext=&country%5B0%5D=LOC_IN&field_job_posted_date=2&op=Submit&page=0" }
    ],
    [
        { "name": "Juspay", "careerLink": "https://www.juspay.in/careers" },
        { "name": "Walmart", "careerLink": "https://one.walmart.com/content/globaltechindia/en_in/results.html?job_function=&job_function=Technology&loc_filter=Bangalore&country=india" },
        { "name": "Quest Global", "careerLink": "https://www.questglboal.com/careers" },
        // { "name": "IBM", "careerLink": "https://www.ibm.com/employment/" },
        { "name": "GE", "careerLink": "https://www.ge.com/careers" }
    ],
    [
        { "name": "Pwc", "careerLink": "https://www.pwc.in/careers/experienced-jobs/results.html?wdcountry=IND&wdjobsite=Global_Experienced_Careers&flds=jobreqid,title,location,jobsite,iso&wdgrade=1840265" },
        { "name": "HSBC", "careerLink": "https://www.hsbc.com/careers" },
        { "name": "Inmobi", "careerLink": "https://www.inmobi.com/careers" },
        { "name": "Meesho", "careerLink": "https://careers.meesho.com" }
    ],
    [
        { "name": "Fuel", "careerLink": "https://www.fuel.com/careers" },
        { "name": "Razorpay", "careerLink": "https://razorpay.com/careers" },
        { "name": "Pay", "careerLink": "https://www.pay.com/careers" },
        { "name": "Tekion", "careerLink": "https://tekion.com/job-openings/india/all?department=Engineering" }
    ],
    [
        { "name": "WebEngage", "careerLink": "https://webengage.com/current-openings/#JobOpenings" },
        { "name": "Paypal", "careerLink": "https://paypal.eightfold.ai/careerhub/explore/jobs/274905069998" },
        { "name": "Quince", "careerLink": "https://job-boards.greenhouse.io/quince?offices%5B%5D=4016256008" },
        { "name": "Simplismast", "careerLink": "https://www.simplismart.ai/careers" }
    ],
    [
        { "name": "LG", "careerLink": "https://www.lg.com/careers" },
        { "name": "Sapiens", "careerLink": "https://careers.sapiens.com/" },
        { "name": "Siemens", "careerLink": "https://new.siemens.com/global/en/company/jobs.html" },
        { "name": "Benz", "careerLink": "https://jobs.mercedes-benz.com/en?en%3FPositionFormattedDescription.Content=&PositionLocation.Country=%5B390%5D&JobCategory.Code=%5B46%5D" }
    ],
    [
        { "name": "Bosch", "careerLink": "https://careers.smartrecruiters.com/BoschGroup/india" },
        { "name": "Sunlife Global", "careerLink": "https://www.sunlife.com/careers" },
        { "name": "Azentio", "careerLink": "https://www.azentio.com/careers" },
        { "name": "Flipkart", "careerLink": "https://www.flipkartcareers.com" }
    ],
    [
        { "name": "Jio", "careerLink": "https://www.jio.com/careers" },
        { "name": "Salesforce", "careerLink": "https://www.salesforce.com/company/careers" },
        { "name": "PhonePe", "careerLink": "https://www.phonepe.com/careers" },
        { "name": "JP Morgan", "careerLink": "https://careers.jpmorgan.com" }
    ],
    [
        { "name": "Cisco", "careerLink": "https://jobs.cisco.com" },
        { "name": "Amazon", "careerLink": "https://www.amazon.jobs" },
        { "name": "CarWale", "careerLink": "https://www.carwale.com/career/" },
        { "name": "1mg", "careerLink": "https://1mg.darwinbox.in/ms/candidate/careers" }
    ],
    [
        { "name": "Intuit", "careerLink": "https://www.intuit.com/careers" },
        { "name": "Zepto", "careerLink": "https://www.zepto.in/careers" },
        { "name": "licious", "careerLink": "https://licious.darwinbox.in/ms/candidate/careers" },
        { "name": "BT", "careerLink": "https://www.bt.com/careers" }
    ],
    [
        // { "name": "Quest Global", "careerLink": "https://www.questglboal.com/careers" },
        // { "name": "", "careerLink": "https://www.google.com" },
        // { "name": "", "careerLink": "https://www.google.com" },
        // { "name": "", "careerLink": "https://www.google.com" }
    ],

]

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

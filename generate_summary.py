import pandas as pd
from openpyxl import Workbook
from openpyxl.styles import Font
import sys
import os

# Create scripts directory if it doesn't exist to mimic builders structure if needed, 
# but I will use standard pandas/openpyxl as fallback or if I can find the actual builders.py.

data = {
    'Salesman': ['Nicole Wu', 'Carol Lee', 'Lisa Xia', 'Ivy Gao', 'Lia Liang', 'Siri Cai', 'Ray Yang', 'Lily Shi', 'Emma Ho', 'Guo Ying'],
    'Total Received (Last 3M)': [96105, 52444, 47299, 41427, 22316, 11669, 5080, 0, 0, 0],
    'Top Customer (Sample)': ['Multiple', 'Multiple', 'Multiple', 'Multiple', 'Multiple', 'Multiple', 'Multiple', '-', '-', '-'],
    'Opportunity Count (Approx)': [68, 52, 31, 38, 7, 60, 46, 22, 1, 2],
    'High-Value Status': ['★重点', '★重点', '★重点', '★重点', '★重点', '关注', '关注', '-', '-', '-']
}

# Special entries as requested/corrected
details_data = {
    'Salesman': ['Siri Cai', 'Lisa Xia', 'Nicole Wu', 'Ivy Gao', 'Carol Lee'],
    'Customer Name': ['Matthew Kennedy', 'Gaby Rodriguez', 'Recent High-Value Lead', 'Recent High-Value Lead', 'Recent High-Value Lead'],
    'Country': ['US', 'HK', 'US', 'CA', 'UK'],
    'Opportunity Amount (USD)': [600, 185, 15000, 12000, 11000],
    'Current Stage': ['Sampling', 'Closed/Production', 'Quoting', 'Designing', 'Quoting'],
    'Source': ['WhatsApp', 'ICBU', 'ICBU', 'ICBU', 'ICBU']
}

df_summary = pd.DataFrame(data)
df_details = pd.DataFrame(details_data)

with pd.ExcelWriter('salesman_opportunities_summary.xlsx', engine='openpyxl') as writer:
    df_summary.to_excel(writer, sheet_name='Salesman Summary', index=False)
    df_details.to_excel(writer, sheet_name='Opportunity Details', index=False)

print("Report generated: salesman_opportunities_summary.xlsx")

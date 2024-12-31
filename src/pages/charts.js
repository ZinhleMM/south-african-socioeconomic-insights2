import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            About the GHS 2023 Data Visualization App
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Learn more about the purpose of this application and the dataset used.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Purpose</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                This application provides insights into South African households' socioeconomic conditions using data from the General Household Survey (GHS) 2023. It allows users to explore key metrics, visualize trends, and analyze data interactively.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Dataset</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                The dataset used in this application is the General Household Survey (GHS) 2023, which contains detailed information about South African households, including demographics, income, food security, and access to services. The dataset includes 20,927 records and 188 variables.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Features</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                - Interactive charts and maps for data visualization.<br />
                - Filters for exploring data by province, income, and other metrics.<br />
                - Insights into food security, household size, and asset ownership.<br />
                - Easy-to-use interface for exploring socioeconomic trends.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Data Source</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                The data is sourced from the General Household Survey (GHS) 2023, provided by Statistics South Africa. The dataset is open and publicly available for research and analysis.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Terms of Use</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                This application is for educational and research purposes only. The data is used in compliance with the terms and conditions set by Statistics South Africa.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                For any questions or feedback, please contact the developer at <a href="mailto:developer@example.com" className="text-blue-500">developer@example.com</a>.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default About;
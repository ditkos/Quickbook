// EulaComponent.js

import React from 'react';

const EULA = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">End User License Agreement (EULA)</h2>
      <p className="mb-4">
        This End User License Agreement (<span className="italic">&quot;Agreement&quot;</span>) is entered into between the
        user (<span className="italic">&quot;User&quot;</span>) and MBM Wholesalers (<span className="italic">&quot;Company&quot;</span>)
        and outlines the terms and conditions governing the use of the software product or service provided by MBM Wholesalers.
        By using the software, the User agrees to comply with all the terms and conditions herein.
      </p>

      <h3 className="text-lg font-bold mb-2">Grant of License:</h3>
      <p className="mb-4">
        1.1 The Company grants the User a non-exclusive, non-transferable license to use the software in accordance with
        the guidelines set forth in the accompanying documentation.
      </p>

      <h3 className="text-lg font-bold mb-2">Intellectual Property:</h3>
      <p className="mb-4">
        2.1 All content and intellectual property related to the software, including but not limited to copyrights,
        trademarks, and trade secrets, remain the exclusive property of MBM Wholesalers.
      </p>

      <h3 className="text-lg font-bold mb-2">Limitation of Liability:</h3>
      <p className="mb-4">
        3.1 MBM Wholesalers shall not be liable for any direct, indirect, incidental, special, consequential, or punitive
        damages arising from the use or inability to use the software.
      </p>

      <h3 className="text-lg font-bold mb-2">Acceptance of Terms:</h3>
      <p>
        4.1 By accepting these terms, the User acknowledges and agrees to comply with all the provisions laid out in this Agreement.
      </p>
    </div>
  );
};

export { EULA };

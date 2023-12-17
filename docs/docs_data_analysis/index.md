## Package overview

This package is a comprehensive solution for data query, analysis and visualization. With its extensive features, you can quickly and easily extract valuable insights from your data.

The package is devided into three modules: [Data access](#data-access), [Error analysis](#error-analysis) and [Validation](#validation).

---

### Data access

The first module, [**data_access**](documentation/data_access.md), is designed to communicate with the database and obtain information about the selected data packages.
You will be able to effortlessly get overview about the simulated data and its structure, create queries and download the data you are interested in. Once you have your data, the package provides set of tools for data visualisation and manipulation, making it easy to prepare your data for future analysis. See the [examples](data_access_examples.md) of its main features.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<ThemedImage
alt="Data access themed image"
sources={{
    light: useBaseUrl('/img/img_data_access_light.png'),
    dark: useBaseUrl('/img/img_data_access_dark.png'),
  }}
/>

---

### Error analysis

Second module [**error_analysis**](documentation/error_analysis.md) containes a range of analysis methods, including statistical analysis and regressions, enabling you to visualize the results and derive valuable insights from your data. It provides an easy way to check statistics, explore correlations, and make predictions using regressions. See the [examples](error_analysis_examples.md) about the module usage.

<ThemedImage
alt="Error analysis themed image"
sources={{
    light: useBaseUrl('/img/img_error_analysis_light.png'),
    dark: useBaseUrl('/img/img_error_analysis_dark.png'),
  }}
/>

---

### Validation

Module [**validation**](documentation/validation.md) provides methods to tests the results of the simulations. By utilizing the 'validation' module, you can assess the compliance of data against various criteria, facilitating the analysis and evaluation of simulation results. To learn more, check the [examples](validation_examples.md).

<ThemedImage
alt="Validation themed image"
sources={{
    light: useBaseUrl('/img/validation.png'),
    dark: useBaseUrl('/img/validation_dark.png'),
  }}
/>

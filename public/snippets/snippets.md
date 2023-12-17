# Data access

<details>
<summary>Repositories</summary>

<br />
<h3> All repositories</h3>
Get overview about the repositories:

```python
from citros_data_analysis import data_access as da

citros = da.CitrosDB()
citros.search_repo().print()
```
<br />
<h3> Exact repository</h3>

Get overview about exact repository 'my_repository':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
repo_name = 'my_repository'
# --------------------------- #

citros = da.CitrosDB()
citros.search_repo(repo_name).print()
```
</details>

<details>
<summary>Batches</summary>

<br />
<h3> All batches </h3>
Get overview about the batches:

```python
from citros_data_analysis import data_access as da

citros = da.CitrosDB()
citros.search_batch().print()
```
<br />
<h3> Last created batch </h3>

Show information about my last created batch:

```python
from citros_data_analysis import data_access as da

citros = da.CitrosDB()
citros.search_batch(-1, user = 'me').print()
```
<br />
<h3> Exact batch </h3>

Show information about exact batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
# --------------------------- #

citros = da.CitrosDB()
citros.search_batch(batch_name).print()
```
<br />
<h3> Exact batch in the exact repository</h3>

Show information about the exact batch 'my_batch' in the repository 'my_repository':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
repo_name = 'my_repository'
batch_name = 'my_batch'
# --------------------------- #

citros = da.CitrosDB()
citros.repo(repo_name).search_batch(batch_name).print()
```
</details>

<details>
<summary>Users</summary>

<br />
<h3> Table of users </h3>

Show table with user's information

```python
from citros_data_analysis import data_access as da

citros = da.CitrosDB()
citros.get_users()
```
<br />
<h3> Users and repositories they created </h3>

Print user's information as dictionary, including information about repositories they created:

```python
from citros_data_analysis import data_access as da

citros = da.CitrosDB()

citros.search_user(order_by = 'name').print()
```
</details>

<details>
<summary>Batch content</summary>

<br />
<h3> Data overview </h3>

<h4> General information </h4>
Show information about batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
# --------------------------- #

citros = da.CitrosDB()
citros.batch(batch_name).info().print()
```
<h4> Topic overview </h4>
Show information and structure of the data of the topic 'my_topic' from the batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
citros.batch(batch_name).topic(topic_name).info().print()
```
<h4> Data structure </h4>
Show table with data structure for topic 'my_topic' of  the batch 'my_batch' :

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
citros.batch(batch_name).topic(topic_name).get_data_structure()
```
<br />
<h3> Minimum, maximum values, number of messages </h3>

<h4> Maximum value </h4>
Get maximum value of the column 'my_column' for the topic 'my_topic' from the batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_name = 'my_column'
# --------------------------- #

citros = da.CitrosDB()
max_value = citros.batch(batch_name).topic(topic_name).get_max_value(column_name)
print(max_value)
```
<h4> Minimum value </h4>
Get minimum value of the column 'my_column' for the topic 'my_topic' from the batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_name = 'my_column'
# --------------------------- #

citros = da.CitrosDB()
min_value = citros.batch(batch_name).topic(topic_name).get_min_value(column_name)
print(min_value)
```
<h4> Indices of the minimum and maximum values </h4>
Get minimum and maximum values of the column 'my_column' and corresponding to them values of sid and rid for the topic 'my_topic' from the batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_name = 'my_column'
# --------------------------- #

citros = da.CitrosDB()
max_value, sid_max, rid_max = citros.batch(batch_name).topic(topic_name).get_max_value(column_name, return_index = True)
min_value, sid_min, rid_min = citros.batch(batch_name).topic(topic_name).get_min_value(column_name, return_index = True)
print(f"maximum value of the column {column_name} = {max_value}, corresponding sid = {sid_max}, rid = {rid_max}")
print(f"minimum value of the column {column_name} = {min_value}, corresponding sid = {sid_min}, rid = {rid_min}")
```
<h4> List unique values </h4>
Get list of simulation ids (sid) for the topic 'my_topic' from the batch 'my_batch':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
sid_list = citros.batch(batch_name).topic(topic_name).get_unique_values('sid')
print(sid_list)
```
<h4> Number of messages </h4>
Get number of messages in the batch 'my_batch' for the topic 'my_topic':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
n = citros.batch(batch_name).topic(topic_name).get_counts()
print(n)
```
<h4> Number of messages in each simulation</h4>
Get number of messages in the batch 'my_batch' for the topic 'my_topic' for each simulation id (sid):

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
n_by_sid = citros.batch(batch_name).topic(topic_name).get_counts(group_by='sid')
print(n_by_sid)
```
</details>
<br />

# Query data

<details>
<summary>Query all data</summary>

Query data from the batch 'my_batch' for topic 'my_topic':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).data()

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Query exact simulation</summary>

Query data from the batch 'my_batch' for topic 'my_topic' for the exact simulation id (sid) = 1:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).sid(1).data()

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Query several simulations </summary>

Query data from the batch 'my_batch' for topic 'my_topic' for simulation id (sid) = 1 and 2:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).sid([1, 2]).data()

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Query first `n` messages </summary>

Query first `n` messages of the each simulation from batch 'my_batch' for topic 'my_topic'. Parameter `rid` is a serial number (starts from 0) in each simulation and by method `rid()` we can set the last rid to query:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
n = 5
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).rid(end = n-1).data()
print(df)
```
</details>

<details>
<summary>Query every n-th message  </summary>

Query every n-th message of each simulation from batch 'my_batch' for topic 'my_topic':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
n = 5
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).skip(n).data()

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Average before querying</summary>

<br />
<h3> Average</h3>

Group and average every set of `n` consecutive messages of each simulation run and query averaged data from batch 'my_batch' for topic 'my_topic'. The queried column(s) must be numeric and explicitly specified.

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
data_column = 'my_column'
n = 5
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).avg(n).data(data_column)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
<br />
<h3> Moving average</h3>

Compute moving average with the window size equals `n` and then query each `s`-th message of the result. The queried column(s) must be numeric and explicitly specified.

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
data_column = 'my_column'
n = 5
s = 2
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).move_avg(n, s).data(data_column)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Query array data  </summary>

<h4> Retrieve one column  </h4>
Let's consider a table for topic 'my_topic' from the batch 'my_batch', where each row under the 'data' column holds a dictionary (json-object) and within this dictionary, the key 'data' maps to a array of values, as shown:


|data                 |
|---------------------|
|{data: [1, 2, 3...]} |
|{data: [4, 5, 6...]} |
|...                  |


To extract the values from the first indexes from these arrays, follow these steps:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_name = 'data.data[0]'
# --------------------------- #

citros = da.CitrosDB()

# index starts from 0, so refer to the first index as "[0]"
df = citros.batch(batch_name).topic(topic_name).data(column_name)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
<h4> Retrieve several columns </h4>
Let's consider a table for topic 'my_topic' from the batch 'my_batch', where each row under the 'data' column holds a dictionary and within this dictionary, the key 'val' maps to a list of values, as shown:


|data                 |
|---------------------|
|{val: [1, 2, 3...]}  |
|{val: [4, 5, 6...]}  |
|...                  |


To extract the values, for example, from the first and second indexes from these arrays, follow these steps:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_names = ['data.val[0]', 'data.val[1]']
# --------------------------- #

citros = da.CitrosDB()

# index starts from 0, so refer to the first index as "[0]" and to the second as "[1]"
df = citros.batch(batch_name).topic(topic_name).data(column_names)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
<h4> Divide array by columns </h4>
Suppose for topic 'my_topic' from the batch 'my_batch' every row in the 'data' column contains a dictionary and within this dictionary, the 'data' key corresponds to a list that has a length of 3, as illustrated below:

|data              |
|------------------|
|{data: [1, 2, 3]} |
|{data: [4, 5, 6]} |
|...               |

To extract these values into separate columns and label them as 'x', 'y', and 'z', proceed as follows:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
# --------------------------- #

new_column_names = ['x', 'y', 'z']
query = ['data.data['+str(i)+']' for i in range(len(new_column_names))]

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).data(query)
df.rename({query[i]: new_column_names[i] for i in range(len(query))}, axis = 1, inplace = True)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Query json-object data  </summary>

For topic 'my_topic' from batch 'my_batch' consider a table where the 'data' column holds dictionaries with keys 'x', 'y', and 'z', as illustrated:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

To retrieve only the data corresponding to the keys 'x' and 'y':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_names = ['data.x', 'data.y']
# --------------------------- #

citros = da.CitrosDB()

df = citros.batch(batch_name).topic(topic_name).data(column_names)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>

<details>
<summary>Query mixed format data  </summary>

If data has a very complex format, combining json-arrays and json-objects nested inside each other, for example like:

|data                           |
|-------------------------------
|{coord: {v: [0, {w: [1]} ] } } |
|{coord: {v: [0, {w: [2]} ] } } |
|...                            |

to retrieve values from array under the key 'w', batch is 'my_batch' and topic is 'my_topic':

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'
column_name = 'data.coord.v[1].w[0]'
# --------------------------- #

citros = da.CitrosDB()

df = citros.batch(batch_name).topic(topic_name).data(column_name)

#print first 5 rows of the obtained pandas.DataFrame
print(df.head(5))
```
</details>
<br />

# Plotting

<details>
<summary>Plot with pandas</summary>

If the data for topic 'my_topic' in batch 'my_batch' looks like the following:



|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |


To plot a graph with 'data.y' on the vertical axis versus 'rid' on the horizontal axis, and to separate the data based on 'sid', follow these steps:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

y = 'data.y'
# --------------------------- #

citros = da.CitrosDB()
citros.batch(batch_name).topic(topic_name).data(y)\
        .set_index(['rid','sid']).unstack()[y].plot()
```
</details>

<details>
<summary>Time plot</summary>

If the data for topic 'my_topic' in batch 'my_batch' looks like the following:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

To plot 'data.x' against Time for each simulation (sid), where `Time` = `time_step` * rid:

```python
from citros_data_analysis import data_access as da
import matplotlib.pyplot as plt
fig, ax = plt.subplots()

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

y = 'data.x'
# --------------------------- #

citros = da.CitrosDB()
citros.batch(batch_name).topic(topic_name).\
       time_plot(ax, var_name = y, time_step = 0.5, y_label = 'x', title_text = 'x vs. Time')
```
</details>

<details>
<summary>(y vs. x)</summary>

If the data for topic 'my_topic' in batch 'my_batch' looks like the following:


|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |


To plot a graph with 'data.y' on the vertical axis versus 'data.x' on the horizontal axis, separating data according to simulations (sid), do the following:

```python
from citros_data_analysis import data_access as da
import matplotlib.pyplot as plt
fig, ax = plt.subplots()

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

x = 'data.x'
y = 'data.y'
# --------------------------- #

citros = da.CitrosDB()
citros.batch(batch_name).topic(topic_name).\
       xy_plot(ax, var_x_name = x, var_y_name = y, x_label = 'x', y_label = 'y', title_text = 'y vs. x')
```
</details>

<details>
<summary>Plot (y vs. x) </summary>

If the data under the topic 'my_topic' within the batch 'my_batch' is structured as follows:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

To query this data and plot a graph of 'y vs. x', separating by simulation ids (sid):

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

x = 'data.x'
y = 'data.y'
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).data([x, y])

fig, ax = citros.plot_graph(df, x, y, '-', title = 'y vs.x')
```
</details>

<details>
<summary>3D plot </summary>

If the data under the topic 'my_topic' within the batch 'my_batch' is structured as follows:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

to query data and make a 3d plot 'z vs. x and y', separating by simulation ids (sid):

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

x = 'data.x'
y = 'data.y'
z = 'data.z'
# --------------------------- #

#specify whether the axis range should be the same for all axes, True by default
scale = False

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).data([x, y, z])

fig, ax = citros.plot_3dgraph(df, x, y, z, '--', title = 'z vs. x and y', scale = scale)
```
</details>

<details>
<summary>Shared x-axis </summary>

If the data under the topic 'my_topic' within the batch 'my_batch' is structured as follows:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

to query and make two plots 'y vs. x' and 'z va. x', separating by simulation ids (sid):

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

x = 'data.x'
y = 'data.y'
z = 'data.z'
# --------------------------- #

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).data([x, y, z])

fig, ax = citros.multiple_y_plot(df, x, [y, z], '--')
```
</details>

<details>
<summary>Grid of plots </summary>

If the data under the topic 'my_topic' within the batch 'my_batch' is structured as follows:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

To display a 3 x 3 matrix of graphs, where: (1) for the diagonal plots, show histograms depicting value distributions;
(2) for the off-diagonal plots, illustrate the pairwise relationships between x, y, and z, execute the following:

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #
batch_name = 'my_batch'
topic_name = 'my_topic'

x = 'data.x'
y = 'data.y'
z = 'data.z'
# --------------------------- #

#specify whether the axis range should be the same for both axes, True by default
scale = False

citros = da.CitrosDB()
df = citros.batch(batch_name).topic(topic_name).data([x, y, z])

fig, ax = citros.multiplot(df, [x, y, z], '-', scale = scale)
```
</details>

<details>
<summary>Error ellipse </summary>

For the topic 'my_topic' in batch 'my_batch', if the data is structured as follows:

|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |

To plot error ellipse for the values of 'data.x' and 'data.y' columns that corresponds to the last point (rid) in each simulation (sid):

```python
from citros_data_analysis import data_access as da

# --- adjust to your data --- #

#specify batch and topic name
batch_name = 'my_batch'
topic_name = 'my_topic'

#specify columns to plot
x = 'data.x'
y = 'data.y'
# --------------------------- #

#create citrosDB object
citros = da.CitrosDB()

#get all possible sid:
sid_list = citros.batch(batch_name).topic(topic_name).get_unique_values('sid')
print(f"sid numbers: {sid_list}")

#for each sid get the last rid:
rid_dict = {}
for s in sid_list:
    rid_dict[s] = citros.batch(batch_name).topic(topic_name).sid(s).get_max_value('rid')
print(f"rid last numbers: {rid_dict}")

# get the values of 'data.x' and 'data.y', that corresponds to the last rid:
# we are creating an empty DataFrame 'df', query for the values of the exact sid and rid and add the result to the 'df'.
import pandas as pd
df = pd.DataFrame()
for s, r in rid_dict.items():
    df = pd.concat([df, citros.batch(batch_name).topic(topic_name).sid(s).rid(r).data([x, y])])

# print(df)
fig, ax = citros.plot_sigma_ellipse(df, x_label = x, y_label = y, 
                                    n_std = [1,2,3], plot_origin=False, bounding_error=False,
                                    set_x_label='x', set_y_label = 'y', title = 'Error ellipse')
```
</details>
<br />

# Error analysis

<details>
<summary>Get statistics for simulations</summary>

<br />
<h3> 1-dimensional vector </h3>
To analyze data of multiple simulations it is necessary to establish a correspondence between the values of the data from these different simulations. One approach is to select an independent variable, define a scale that is common to all simulations and assign indexes on this scale. Then, the values of variables from different simulations will be connected by this independent variable.

There are two ways to perform index assignment: divide the independent variable into N ranges, assign an index to each interval, and calculate the averages of the data values for each simulation in each range, or scale the independent variable to the interval [0,1], define a new range of N points uniformly distributed from 0 to 1, and interpolate data points over this new interval. The first approach corresponds to the bin_data() method, while the second is implemented by the scale_data() method.

Let's consider a table for topic 'my_topic' from the batch 'my_batch', where each row under the 'data' column holds a dictionary and within this dictionary, under the key 'data' is a list of values, as shown:

|data                 |
|---------------------|
|{data: [1, 2, 3...]} |
|{data: [4, 5, 6...]} |
|...                  |

Let's consider that we would like to calculate statistics among simulations for the values at the first position of the list. An independent variable can be set using values, for instance, from the second position. Also, in some cases, an array of the independent variables be constructed using the 'rid' column, which represents a step in each simulation.
Let's assume, that in each simulation value is recorded every 0.2 seconds, so we can construct and independent variable Time = rid*0.2.

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data is queried from the first index:
data_label = 'data.data[0]'

# Set method of index assignment as 'scale' or 'bin':
method = 'bin'

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2
# --------------------------- #

# Import 'data_access' and 'error_analysis' modules and create CitrosDB object:
from citros_data_analysis import data_access as da
from citros_data_analysis import error_analysis as analysis
citros = da.CitrosDB()

# Query data:
df = citros.batch(batch_name).topic(topic_name).data(data_label)

# Construct independent variable column as: Time = rid*time_step.
df['Time'] = df['rid']*time_step

# Construct CitrosData object, setting 'data.data[0]' as a data-column:
dataset = analysis.CitrosData(df, data_label = data_label, units = 'm')

# set an independent variable as 'Time' (column, that we constructed previously) by label by `param_label`:
if method == 'bin':
    db = dataset.bin_data(n_bins = 50, param_label = 'Time')
# or
elif method == 'scale':
    db = dataset.scale_data(n_points = 50, param_label = 'Time')
else:
    print('please define method of index assignment: "scale" or "bin"')

# Get statistics.
# When data is binned or interpolated, for each of the index the mean values, covariant matrix 
# and standard deviations (the square root the covariant matrix diagonal elements) may be calculated.
# The output table is a pandas DataFrame:

stat = db.get_statistics(return_format = 'citrosStat')

# `stat` contains 3 attributes:
# the mean values (type - pandas.DataFrame):
print('mean values:\n', stat.mean.head(5))

# the standard deviation (type - pandas.DataFrame):
print('standard deviation:\n', stat.std.head(5))

# the covariance matrix (type - pandas.Series):
print('covariance matrix:\n', stat.covar_matrix.head(5))

# Method head(n) of pandas.DataFrame is used to show the first n rows of the table


# Plot statistics.
db.show_statistics()
# by default, it plots +-3 standard deviation boundary.
# To plot for another number of standard deviations, for example for +- 5std boundary: n_std = 5
# you may style area between standard deviation boundaries: by std_area = True fill area with color.
# by std_lines = False - remove lines of the boundary :
db.show_statistics(n_std = 5, std_area = True, std_lines = False)
```
<br />
<h3> N-dimensional vector </h3>

The same example as for the [1-dimensional vector](#get-statistics-for-simulations-1-dimensional-vector), but for the multidimensional vector.

Suppose for topic 'my_topic' from the batch 'my_batch' every row in the 'data' column contains a dictionary and within this dictionary, the 'data' key corresponds to a list that has a length of 3, as illustrated below:

|data              |
|------------------|
|{data: [1, 2, 3]} |
|{data: [4, 5, 6]} |
|...               |

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data is queried from the first, second, and third indices.
# you can explicitly list columns you would like to query:
data_labels = ['data.data[0]', 'data.data[1]', 'data.data[2]']
# or if the entire array is needed, it can be queried, in this example, simply as 'data.data'.
# This way, when the CitrosData object is created, the array will be automatically divided into separate columns
# data_labels = 'data.data'

# Set method of index assignment as 'scale' or 'bin':
method = 'bin'

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2
# --------------------------- #

# Import 'data_access' and 'error_analysis' modules and create CitrosDB object:
from citros_data_analysis import data_access as da
from citros_data_analysis import error_analysis as analysis
citros = da.CitrosDB()

# Query data:
df = citros.batch(batch_name).topic(topic_name).data(data_labels)

# Construct independent variable column as: Time = rid*time_step.
df['Time'] = df['rid']*time_step

# Construct CitrosData object:
dataset = analysis.CitrosData(df, data_label = data_labels, units = 'm')

# set an independent variable as 'Time' (column, that we constructed previously) by label by `param_label`:
if method == 'bin':
    db = dataset.bin_data(n_bins = 50, param_label = 'Time')
# or
elif method == 'scale':
    db = dataset.scale_data(n_points = 50, param_label = 'Time')
else:
    print('please define method of index assignment: "scale" or "bin"')


# Get statistics.
# When data is binned or interpolated, for each of the index mean values, covariant matrix 
# and standard deviations (the square root the covariant matrix diagonal elements) may be calculated.
# The output table is a pandas DataFrame:
stat = db.get_statistics(return_format = 'citrosStat')

# `stat` contains 3 attributes:
# the mean values (type - pandas.DataFrame):
print('mean values:\n', stat.mean.head(5))

# the standard deviation (type - pandas.DataFrame):
print('standard deviation:\n', stat.std.head(5))

# the covariance matrix (type - pandas.Series):
print('covariance matrix:\n', stat.covar_matrix.head(5))

# Method head(n) of pandas.DataFrame is used to show the first n rows of the table


# Plot statistics.
db.show_statistics()
# by default, it plots +-3 standard deviation boundary.
# To plot for another number of standard deviations, for example for +- 5std boundary: n_std = 5
# you may style area between standard deviation boundaries: by std_area = True fill area with color.
# by std_lines = False - remove lines of the boundary:
db.show_statistics(n_std = 5, std_area = True, std_lines = False)
```
</details>

<details>
<summary>Correlation between variables</summary>

For topic 'my_topic' from batch 'my_batch' consider a table where the 'data' column holds dictionaries with keys 'x', 'y', and 'time', as illustrated:

|data                     |
|-------------------------|
|{x: 1, y: 2, time: 0.1}  |
|{x: 4, y: 5, time: 0.2}  |
|...                      |

First, the values from different simulations should be corresponded with each other. For this purpose a common scale may be established through the independent variable. Two methods may be applied. The first one is to divide the independent variable into N ranges, index each, and average the data values within those ranges; it is implemented by `bin_data()` method. The second one is to scale the independent variable between [0,1], set N uniformly distributed points in this range, and interpolate data over this interval; this approach is implemented by method `scale_data()`.

Let's choose 'data.time' as an independent variable, set indices and collect the statistics among different simulations and plot the correlation 'data.x' vs. 'data.y'.

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels to plot correlation for
x = 'data.x'
y = 'data.y'

# Independent variable label
independent_var_label = 'data.time'

# Set method of index assignment as 'scale' or 'bin':
method = 'bin'

# Index to plot corelation for:
slice_id = 1
# or if the index number is unknown, `slice_val` parameter may be used to define 
# the approximate value of the independent variable. The nearest to this value index will be set.
# if the method of index assignment is set as 'scale', do not forget that the interval slice_val is [0, 1].
slice_val = 0.1

# To add bounding error to the plot, set bounding_error = True:
bounding_error = False
# --------------------------- #

# Import 'data_access' and 'error_analysis' modules and create CitrosDB object to query data:
from citros_data_analysis import data_access as da
from citros_data_analysis import error_analysis as analysis
citros = da.CitrosDB()

# Query data
df = citros.batch(batch_name).topic(topic_name).data([x, y, independent_var_label])

# Construct CitrosData object, setting 'data.x' and 'data.y' as a data-columns:
dataset = analysis.CitrosData(df, data_label = [x, y], units = 'm')

# Use method scale_data() or bin_data() to get correspondence between different simulation and assign indexes to independent_var_label axis:

if method == 'bin':
    db = dataset.bin_data(n_bins = 50, param_label = independent_var_label)
# or
elif method == 'scale':
    db = dataset.scale_data(n_points = 50, param_label = independent_var_label)
else:
    print('please define method of index assignment: "scale" or "bin"')

# Plot correlation plot for the exact index:
ellipse_param = db.show_correlation(x_col = x, y_col = y,
                                    slice_id = slice_id,
                                    n_std = 3,
                                    bounding_error = bounding_error,
                                    return_ellipse_param = True)

# Print ellipse parameters:
print("ellipse parameters:")
print(f"center: {ellipse_param['x']}, {ellipse_param['y']}")
print(f"width: {ellipse_param['width']}, height: {ellipse_param['height']}")
print(f"angle: {ellipse_param['alpha']}\n")
if bounding_error:
    print(f"radius of the error circle: {ellipse_param['bounding_error']}\n")

# As an alternative, instead of setting the exact value of index (`slice_id`), the approximate
# value of the independent variable may be provided by `slice_val`. Then the nearest to this value index will be adopted.
#the number of error ellipses and their radii are controlled by parameter `n_std`
db.show_correlation(x_col = x, y_col = y,
                    slice_val = slice_val,
                    n_std = [1, 2, 3],
                    bounding_error = bounding_error)
```
</details>

<details>
<summary>Predictions</summary>

Let's assume that in batch 'my_batch' for the topic 'my_topic' there are four simulations, each of them corresponds to the different value of some parameter 'M'. Also let's consider that each cell in the 'data' column contains a dictionary:

|data               |
|-------------------|
|{x: 1, time: 0.1}  |
|{x: 4, time: 0.2}  |
|...                |

To conduct a comparison of the values of different simulations, the correspondence between these values should be established. That may be done by assigning indices through independent variable. One of the approach is to to divide the independent variable into N ranges, index each, and average the data values within those ranges; it is implemented by `bin_data()` method. The second one is to scale the independent variable between [0,1], set N uniformly distributed points in this range, and interpolate data over this interval; this approach is implemented by method `scale_data()`.

Let's set 'data.time' as an independent variable and find the prediction for the 'data.x' variable for value of M = M0. 

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels to plot correlation for 
data_label = 'data.x'

# Independent variable label
independent_var_label = 'data.time'

# Set method of index assignment as 'scale' or 'bin':
method = 'bin'

# Define which simulation (sid) corresponds to which value of parameter M:
# Let's assume that sid = 0 corresponds to M = -1.5; sid = 1, M = 0, sid = 2, M = 2.5; sid = 3, M = 4:
M = {0: -1.5, 1: 0, 2: 2.5, 3: 4}

# And we would like to find value for the M = 1:
M0 = 1

# Prediction method: 'neural_net' - neural net regression, 'poly' - polynomial regression ('poly') or 'gmm' - gaussian mixture model
predict_method = 'poly'
# --------------------------- #

# Import 'data_access' and 'error_analysis' modules and create CitrosDB object to query data:
from citros_data_analysis import data_access as da
from citros_data_analysis import error_analysis as analysis
citros = da.CitrosDB()

# Create CitrosDataArray object:
db_array = analysis.CitrosDataArray()

# Query data for each of the M parameter, assign indexes over 'data.time' axis to set
# correspondence between different simulations and pass the result to CitrosDataArray that we created:
for s, m in M.items():
    #query data
    df = citros.batch(batch_name).topic(topic_name).sid(s).data([data_label, independent_var_label])

    #create CitrosData object and set 'data.t' as a parameter.
    dataset = analysis.CitrosData(df,  
                                 data_label = data_label,
                                 parameters = {'M': m})
    if method == 'bin':
        db = dataset.bin_data(n_bins = 50, param_label = independent_var_label, show_fig = False)
    # or
    elif method == 'scale':
        db = dataset.scale_data(n_points = 50, param_label = independent_var_label, show_fig = False)
    else:
        print('please define method of index assignment: "scale" or "bin"')

    #store in CitrosDataArray by add_db() method
    db_array.add_db(db)

# Get the prediction with the defined prediction method:

if predict_method == 'poly':
    result = db_array.get_prediction(parameters = {'M': M0},
                                    method = 'poly', 
                                    n_poly = 2,
                                    show_fig = True)
elif predict_method == 'neural_net':
    result = db_array.get_prediction(parameters = {'M': M0}, 
                                     method = 'neural_net',
                                     activation='tanh', max_iter = 200, solver='lbfgs',
                                     hidden_layer_sizes = (8,), random_state = 9,
                                     show_fig = True)
elif predict_method == 'gmm':
    result = db_array.get_prediction(parameters = {'M': M0}, 
                                     method = 'gmm',
                                     show_fig = True)
else:
    print('define prediction method as "neural_net", "poly" or "gmm"')
    result = None

if result is not None:
    print(result.head(5))
```
</details>
<br />

# Validation

<details>
<summary>Overview</summary>

Let's consider a table for topic 'my_topic' from the batch 'my_batch', where each row under the 'data' column contains dictionaries with keys 'x', 'y', and 'z', as illustrated:



|data                |
|--------------------|
|{x: 1, y: 2, z: 3}  |
|{x: 4, y: 5, z: 6}  |
|...                 |


Let's assume that there are number of simulations (sids) and we would like to perform several test on this data to evaluate the quality of the simulation results.

The pipeline is the following: query data, define the independent variable (that is used to establish the correspondence between different simulations), set test parameters.


</details>

<details>
<summary>Checking the standard deviation boundary</summary>

Whether the standard deviation boundary is within the limits.

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels
data_labels = ['data.x', 'data.y', 'data.z']

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2

# 'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
method = 'bin'

# limits: a one value to set the same +-limits to each element of the vector, for examples limits = 0.25
#        list of values to set +-limits for each vector element, for examples limits = [0.25, 0.5, 100]
#        list of lists to set lower and upper intervals separately, for examples limits = [0.25, [-0.3, 0.8], [-150, 100]]
limits = [0.25, [-0.3, 0.8], [-150, 100]]

# number of standard deviations in standard deviation boundary
n_std = 3

# whether nan values are treated as passed test or not
nan_passed = True

# to style the output plot:
# std_area - set True to fill with color standard deviation boundary
std_area = False
# std_lines - set False to remove standard deviation boundary lines
std_lines = True
# std_color - set standard deviation boundary color, default 'b'
std_color = 'b'
# --------------------------- #

from citros_data_analysis import data_access as da
from citros_data_analysis import validation as va

citros = da.CitrosDB()

# query data.
df = citros.batch(batch_name).topic(topic_name).data(data_labels)
# construct independent variable column as: Time = rid*time_step
df['Time'] = df['rid']*time_step

# construct Validation object. It determines how the data will be preprocessed: 
#'data_label' determine data columns, 
#'param_label' is for independent variable that will be used for defining indexes and setting correspondence between different sids 
#'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
#'num' determines number of points if method set as 'scale' or bins if 'method' set as 'bin':
V = va.Validation(df, data_label = data_labels, param_label = 'Time', 
                  method = method, num = 50, units = 'm')

# Set test
log, table, fig = V.std_bound_test(limits = limits, n_std = n_std, nan_passed = nan_passed, 
            std_area = std_area, std_lines = std_lines, std_color = std_color)

# print the report of the test:
log.print()

#DataFrame table that for each point indicates whether it passes the test or not:
print(table.head(5)) #method head(n) shows first n rows of the DataFrame table
```
</details>

<details>
<summary>Checking the mean value</summary>
Test whether the mean values are within the defined boundaries.
Even when some points of the individual simulations may exceed the limits, but the test will be passed for those, whose mean values are within limits.

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels
data_labels = ['data.x', 'data.y', 'data.z']

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2

# 'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
method = 'bin'

# limits: a one value to set the same +-limits to each element of the vector, for examples limits = 0.25
#        list of values to set +-limits for each vector element, for examples limits = [0.25, 0.5, 100]
#        list of lists to set lower and upper intervals separately, for examples limits = [0.25, [-0.3, 0.8], [-150, 100]]
limits = [0.05, 0.05, [-1, 3]]

# whether nan values are treated as passed test or not
nan_passed = True
# --------------------------- #

from citros_data_analysis import data_access as da
from citros_data_analysis import validation as va

citros = da.CitrosDB()

# query data.
df = citros.batch(batch_name).topic(topic_name).data(data_labels)
# construct independent variable column as: Time = rid*time_step
df['Time'] = df['rid']*time_step

# construct Validation object. It determines how the data will be preprocessed: 
#'data_label' determine data columns, 
#'param_label' is for independent variable that will be used for defining indexes and setting correspondence between different sids 
#'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
#'num' determines number of points if method set as 'scale' or bins if 'method' set as 'bin':
V = va.Validation(df, data_label = data_labels, param_label = 'Time', 
                  method = method, num = 50, units = 'm')

# Set test
log, table, fig = V.mean_test(limits = limits)

# print the report of the test:
log.print()

#DataFrame table that for each point indicates whether it passes the test or not:
print(table.head(5)) #method head(n) shows first n rows of the DataFrame table
```
</details>

<details>
<summary>Checking the standard deviation values</summary>
Whether the standard deviation values do not exceed the limits.

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels
data_labels = ['data.x', 'data.y', 'data.z']

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2

# 'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
method = 'bin'

# limits: a one value to set the same limit to each element of the vector, for examples limits = 0.25
#        list of values to set the limits for each vector element, for examples limits = [0.25, 0.5, 100]
limits = [0.25, 0.5, 100]

# number of standard deviations in standard deviation boundary
n_std = 3

# whether nan values are treated as passed test or not
nan_passed = True

# to style the output plot:
# std_area - set True to fill with color standard deviation boundary
std_area = False
# std_lines - set False to remove standard deviation lines
std_lines = True
# std_color - set standard deviation color, default 'b'
std_color = 'b'
# --------------------------- #

from citros_data_analysis import data_access as da
from citros_data_analysis import validation as va

citros = da.CitrosDB()

# query data.
df = citros.batch(batch_name).topic(topic_name).data(data_labels)
# construct independent variable column as: Time = rid*time_step
df['Time'] = df['rid']*time_step

# construct Validation object. It determines how the data will be preprocessed: 
#'data_label' determine data columns, 
#'param_label' is for independent variable that will be used for defining indexes and setting correspondence between different sids 
#'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
#'num' determines number of points if method set as 'scale' or bins if 'method' set as 'bin':
V = va.Validation(df, data_label = data_labels, param_label = 'Time', 
                  method = method, num = 50, units = 'm')

# Set test
log, table, fig = V.std_test(limits = limits, n_std = n_std, nan_passed = nan_passed, 
            std_area = std_area, std_lines = std_lines, std_color = std_color)

# print the report of the test:
log.print()

#DataFrame table that for each point indicates whether it passes the test or not:
print(table.head(5)) #method head(n) shows first n rows of the DataFrame table
```
</details>

<details>
<summary>Checking the individual simulations </summary>


```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels
data_labels = ['data.x', 'data.y', 'data.z']

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2

# 'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
method = 'bin'

# limits: a one value to set the same +-limits to each element of the vector, for examples limits = 0.25
#        list of values to set +-limits for each vector element, for examples limits = [0.25, 0.5, 100]
#        list of lists to set lower and upper intervals separately, for examples limits = [0.25, [-0.3, 0.8], [-150, 100]]
limits = [0.05, 0.15, [-1, 3]]

# whether nan values are treated as passed test or not
nan_passed = True
# --------------------------- #

from citros_data_analysis import data_access as da
from citros_data_analysis import validation as va

citros = da.CitrosDB()

# query data.
df = citros.batch(batch_name).topic(topic_name).data(data_labels)
# construct independent variable column as: Time = rid*time_step
df['Time'] = df['rid']*time_step

# construct Validation object. It determines how the data will be preprocessed: 
#'data_label' determine data columns, 
#'param_label' is for independent variable that will be used for defining indexes and setting correspondence between different sids 
#'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
#'num' determines number of points if method set as 'scale' or bins if 'method' set as 'bin':
V = va.Validation(df, data_label = data_labels, param_label = 'Time', 
                  method = method, num = 50, units = 'm')

# Set test
log, table, fig = V.sid_test(limits = limits)

# print the report of the test:
log.print()

#DataFrame table that for each point indicates whether it passes the test or not:
print(table.head(5)) #method head(n) shows first n rows of the DataFrame table
```
</details>

<details>
<summary>Norm limit test</summary>
Test whether the norm of each simulation do not exceed the given limit

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels
data_labels = ['data.x', 'data.y', 'data.z']

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2

# 'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
method = 'bin'

# type of the norm:
#     - 'Linf' - test whether absolute maximum of each simulation is less then the limits
#     - 'L2' - test whether for each simulation the Euclidean norm (square root of the sum of the squares) 
#     does not exceed the given limit
norm_type = 'Linf'

# limits: a one value to set the same +-limits to each element of the vector, for examples limits = 0.25
#        list of values to set +-limits for each vector element, for examples limits = [0.25, 0.5, 100]
limits = [0.2, 0.2, 15]
# --------------------------- #

from citros_data_analysis import data_access as da
from citros_data_analysis import validation as va

citros = da.CitrosDB()

# query data.
df = citros.batch(batch_name).topic(topic_name).data(data_labels)
# construct independent variable column as: Time = rid*time_step
df['Time'] = df['rid']*time_step

# construct Validation object. It determines how the data will be preprocessed: 
#'data_label' determine data columns, 
#'param_label' is for independent variable that will be used for defining indexes and setting correspondence between different sids 
#'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
#'num' determines number of points if method set as 'scale' or bins if 'method' set as 'bin':
V = va.Validation(df, data_label = data_labels, param_label = 'Time', 
                  method = method, num = 50, units = 'm')

# Set test
log, table, fig = V.norm_test(norm_type = norm_type, limits = limits)

# print the report of the test:
log.print()

#DataFrame table that for each point indicates whether it passes the test or not:
print(table.head(5)) #method head(n) shows first n rows of the DataFrame table
```
</details>

<details>
<summary>Set multiple tests</summary>
Set several tests at once.

```python
# --- adjust to your data --- #

# Set batch and topic names.
batch_name = 'my_batch'
topic_name = 'my_topic'

# Data labels
data_labels = ['data.x', 'data.y', 'data.z']

# Set time step to construct independent variable column as: Time = rid*time_step.
time_step  = 0.2

# 'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
method = 'bin'

# Define parameters of the tests as dictionaries with key being the test name ('std_bound', 'mean', 'sid', 'norm_L2', 'norm_Linf'):
define_tests = {'std_bound' : {'limits' : [0.2, 0.2, [-2, 4]], 'n_std': 3},
                'norm_Linf' : {'limits' : [0.1, 0.1, 2]}}
# --------------------------- #

from citros_data_analysis import data_access as da
from citros_data_analysis import validation as va

citros = da.CitrosDB()

# query data.
df = citros.batch(batch_name).topic(topic_name).data(data_labels)
# construct independent variable column as: Time = rid*time_step
df['Time'] = df['rid']*time_step

# construct Validation object. It determines how the data will be preprocessed: 
#'data_label' determine data columns, 
#'param_label' is for independent variable that will be used for defining indexes and setting correspondence between different sids 
#'method' defines how the index assignment will be done:
#    - 'scale': by scaling independent variable to unit interval and interpolating data on this interval,
#    - 'bin': by dividing independent variable on bins and calculating mean data values among points fallen in each bin
#'num' determines number of points if method set as 'scale' or bins if 'method' set as 'bin':
V = va.Validation(df, data_label = data_labels, param_label = 'Time', 
                  method = method, num = 50, units = 'm')

# Set tests
logs, tables, figs = V.set_tests(test_method = define_tests)

#logs, tables, figs are the dictionaries with the corresponding to each test log, table and fig, 
#where key of the dictionary is the name of the test:
logs['std_bound'].print()
print(tables['norm_Linf'])
```
</details>


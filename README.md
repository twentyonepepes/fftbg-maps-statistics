# statistics: final fantasy tactics battlegrounds tactics maps
## Introduction
### What is this project?
### What is Final Fantasy Tacitcs Battlegrounds (fftbg)?

## project map

## Usage

configuration
TILE_CENTRALITY_K
?

OUTLIER_TILE_MIN_DEVIATION
The minimum variance from the mean of tile X/Y position for a tile to be considered an outlier, and disregarded for statistical purposes.

OUTLIER_TILE_HEIGHT_MINIMUM_DEVIATION
The minimum deviation a tile's height must have to considered a "bump" or an outlier in height.


## primary dims
meanAllySpawnDistance

meanClosestOpposingSpawnDistance
The average number of tiles between a unit and the closest unit spawned on the opposing team.

avgTileDepth
The average water depth of non-outlier tiles.

avgTilePassability
The percentage of non-outlier tiles which can be traversed without swim, float or lavawalking.

meanHeightDeference
The mean difference between any two adjecent non-outlier tiles.

heightVariance
The variance in tile height for non-outlier tiles. High variance suggests a sloped or peaked map, while no variance is a perfectly flat map.

bumpiness
The percentage of tiles considered to be an outlier in terms of height.


<!-- water% -->
<!-- peripheryWater/Lava/Impassable% -->
<!-- centralWater/Lava/ImpassableSnub% -->

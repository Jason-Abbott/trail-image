var Format = require('../format.js');
/** @type {singleton} */
var Flickr = require('../flickr.js');
var log = require('winston');

/**
 * Default route action
 * @var {Array.<Flickr.Exif>} exif
 * @see {@link http://www.flickr.com/services/api/flickr.photos.getExif.html}
 */
exports.exif = function(req, res)
{
    /** @type {string} */
    var photoID = req.params.photoID;

    Flickr.current.getEXIF(photoID, function(exif)
    {
        var values = exifValues(exif, [
            'Artist',
            'ExposureCompensation',
            'ExposureTime',
            'FNumber',
            'FocalLength',
            'ISO',
            'Lens',
            'Model',
            'Software'
        ]);

	    if (values.Artist && /Abbott/.test(values.Artist))
	    {
		    values.Model = normalizeCamera(values.Model);
		    values.Lens = normalizeLens(values.Lens);
		    values.ExposureCompensation = normalizeCompensation(values.ExposureCompensation);
			// don't show focal length for primes
		    if (!/\d\-\d/.test(values.Lens)) { values.FocalLength = null; }
	    }

	    values.Software = normalizeSoftware(values.Software);

        res.render('exif', { 'exif': values, 'layout': null });
    });
};

/**
 * @param {String} text
 * @returns {String}
 */
function normalizeCamera(text)
{
	return text
		.replace('NIKON', 'Nikon')
		.replace('ILCE-7R', 'Sony α7R');
}

/**
 * @param {String} text
 * @returns {String}
 */
function normalizeLens(text)
{
	return text
		.replace('FE 35mm F2.8 ZA', 'Sony 35mm ƒ/2.8')
		.replace('58.0 mm f/1.4', 'Voigtländer Nokton 58mm ƒ/1.4 SL II')
		.replace('14.0 mm f/2.8', 'Samyang 14mm ƒ/2.8')
		.replace('50.0 mm f/1.4', 'Sigma 50mm ƒ/1.4 EX DG')
		.replace('35.0 mm f/2.0', 'Nikkor 35mm ƒ/2.0D')
		.replace('150.0 mm f/2.8', 'Sigma 150mm ƒ/2.8 EX DG HSM APO')
		.replace('90.0 mm f/2.8', 'Tamron 90mm ƒ/2.8 SP AF Di')
		.replace('24.0 mm f/3.5', 'Nikkor PC-E 24mm ƒ/3.5D ED')
		.replace('17.0-55.0 mm f/2.8', 'Nikon 17–55mm ƒ/2.8G')
		.replace('10.0-20.0 mm f/4.0-5.6', 'Sigma 10–20mm ƒ/4–5.6 EX DC HSM')
		.replace('18.0-200.0 mm f/3.5-5.6', 'Nikkor 18–200mm ƒ/3.5–5.6G ED VR');
}

/**
 * @param {String} text
 * @returns {String}
 */
function normalizeSoftware(text)
{
	return text
		.replace('Photoshop Lightroom', 'Lightroom')
		.replace(/\s*\(Windows\)/, '');
}

/**
 * @param {String} text
 * @returns {String}
 */
function normalizeCompensation(text)
{
	if (text == '0') { text = 'No'; }
	return text;
}

/**
 * Create object with tag keys and string values from EXIF
 * @param {Array.<Flickr.Exif>} exif
 * @param {Array.<string>} tags
 * @return {Object.<string>}
 */
function exifValues(exif, tags)
{
    var values = {};

    for (var i = 0; i < tags.length; i++)
    {
        values[tags[i]] = exifValue(exif, tags[i]);
    }
    return values;
}

function exifValue(exif, tag)
{
    for (var i = 0; i < exif.length; i++)
    {
        if (exif[i].tag == tag) { return exif[i].raw._content; }
    }
    return null;
}

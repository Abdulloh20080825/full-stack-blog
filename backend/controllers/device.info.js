const os = require('os');

class DeviceInfo {
	async getDeviceInfo(req, res) {
		try {
			const hostname = os.hostname();
			const platform = os.platform();
			const processor = os.cpus();
			const operation_system = os.version();

			return res.status(200).json({
				message: 'Successfuly get info user device',
				hostname,
				platform,
				processor: processor[0],
				operation_system,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Device not found',
			});
		}
	}
}

module.exports = new DeviceInfo();

package hackyeah.weather;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import hackyeah.weather.dto.Alert;

@Path("/alert")
public class AlertService {

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public void reportNew(Alert alert) {
		new AlertManager().createAlert(alert);
	}
}

package hackyeah.weather.exceptions;

public class HackYeahWeatherAppException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public HackYeahWeatherAppException() {
        super();
    }

    public HackYeahWeatherAppException(String message, Throwable cause) {
        super(message, cause);
    }

}

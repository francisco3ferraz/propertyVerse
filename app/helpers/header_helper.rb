module HeaderHelper
    def host_your_home_url
        return "#" if user_signed_in?
        new_user_session_path
    end
end
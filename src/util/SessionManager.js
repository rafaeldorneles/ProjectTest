var method = SessionManager.prototype;


function SessionManager()
{

}

method.isLogged = function (session)
{
    if (!session.user)
	{
		return false;
	}

    return true;
};

method.logar = function (session, usuario)
{
    session.user = usuario;
};

method.deslogar = function (session)
{
	session.destroy();
};

method.getUser = function (session)
{
	return session.user;
};

module.exports = SessionManager;
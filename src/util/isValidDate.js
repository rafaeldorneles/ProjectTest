module.exports = function(data)
{
	if (data instanceof Date) 
	{
  		// it is a date
  		if (isNaN(data.getTime())) 
  		{  
  			return false;
  		}
  		else 
  		{
    		return true;
  		}
	}
	else 
	{
  		return false;
	}
}